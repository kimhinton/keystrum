const NOTE_FREQUENCIES: Record<string, number> = {
  "C2": 65.41, "C#2": 69.30, "D2": 73.42, "D#2": 77.78, "E2": 82.41,
  "F2": 87.31, "F#2": 92.50, "G2": 98.00, "G#2": 103.83, "A2": 110.00,
  "A#2": 116.54, "B2": 123.47,
  "C3": 130.81, "C#3": 138.59, "D3": 146.83, "D#3": 155.56, "E3": 164.81,
  "F3": 174.61, "F#3": 185.00, "G3": 196.00, "G#3": 207.65, "A3": 220.00,
  "A#3": 233.08, "B3": 246.94,
  "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13, "E4": 329.63,
  "F4": 349.23, "F#4": 369.99, "G4": 392.00, "G#4": 415.30, "A4": 440.00,
  "A#4": 466.16, "B4": 493.88,
  "C5": 523.25, "C#5": 554.37, "D5": 587.33, "D#5": 622.25, "E5": 659.26,
  "F5": 698.46, "F#5": 739.99, "G5": 783.99, "G#5": 830.61, "A5": 880.00,
};

export function noteToFreq(note: string): number {
  return NOTE_FREQUENCIES[note] ?? 440;
}

const PLUCK_BUFFER_CACHE_MAX = 64;

export class GuitarSynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private convolver: ConvolverNode | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private _recording = false;
  private pluckBufferCache: Map<string, AudioBuffer> = new Map();

  async ensureContext(): Promise<AudioContext> {
    if (!this.ctx) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctor();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);
      this.convolver = this.createReverb(this.ctx);
      const wet = this.ctx.createGain();
      wet.gain.value = 0.18;
      this.convolver.connect(wet).connect(this.masterGain);
    }
    if (this.ctx.state === "suspended") await this.ctx.resume();
    return this.ctx;
  }

  private createReverb(ctx: AudioContext): ConvolverNode {
    const convolver = ctx.createConvolver();
    const length = ctx.sampleRate * 1.4;
    const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const ch = impulse.getChannelData(c);
      for (let i = 0; i < length; i++) {
        ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.2);
      }
    }
    convolver.buffer = impulse;
    return convolver;
  }

  setVolume(v: number) {
    if (this.masterGain) this.masterGain.gain.value = Math.max(0, Math.min(1, v));
  }

  get isRecording(): boolean {
    return this._recording;
  }

  async startRecording(preferredMimeTypes?: string[]): Promise<{ mimeType: string } | null> {
    if (typeof MediaRecorder === "undefined") return null;
    const ctx = await this.ensureContext();
    const candidates =
      preferredMimeTypes && preferredMimeTypes.length > 0
        ? preferredMimeTypes
        : ["audio/webm;codecs=opus", "audio/webm"];
    const mimeType = candidates.find((m) => {
      try { return MediaRecorder.isTypeSupported(m); } catch { return false; }
    });
    if (!mimeType) return null;
    const dest = ctx.createMediaStreamDestination();
    if (this.masterGain) this.masterGain.connect(dest);
    this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(dest.stream, { mimeType });
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.recordedChunks.push(e.data);
    };
    this.mediaRecorder.start(100);
    this._recording = true;
    return { mimeType };
  }

  dispose(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      try { this.mediaRecorder.stop(); } catch { /* ignore */ }
    }
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this._recording = false;
    if (this.ctx && this.ctx.state !== "closed") {
      this.ctx.close().catch(() => { /* ignore */ });
    }
    this.ctx = null;
    this.masterGain = null;
    this.convolver = null;
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state !== "recording") {
        resolve(new Blob([]));
        return;
      }
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: this.mediaRecorder!.mimeType });
        this.recordedChunks = [];
        this._recording = false;
        resolve(blob);
      };
      this.mediaRecorder.stop();
    });
  }

  getVolume(): number {
    return this.masterGain?.gain.value ?? 0.5;
  }

  async playClick(accent = false) {
    const ctx = await this.ensureContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = accent ? 1200 : 800;
    gain.gain.setValueAtTime(accent ? 0.35 : 0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  }

  async pluck(freq: number, duration = 2.5, velocity = 0.8) {
    const ctx = await this.ensureContext();
    const sampleRate = ctx.sampleRate;
    const cacheKey = `${freq.toFixed(2)}:${duration.toFixed(2)}:${sampleRate}`;
    let buffer = this.pluckBufferCache.get(cacheKey);

    if (!buffer) {
      const bufferLength = Math.floor(sampleRate * duration);
      buffer = ctx.createBuffer(1, bufferLength, sampleRate);
      const data = buffer.getChannelData(0);

      const period = Math.floor(sampleRate / freq);
      const delayLine = new Float32Array(period);
      for (let i = 0; i < period; i++) delayLine[i] = Math.random() * 2 - 1;

      const damping = 0.996;
      const filterAmount = 0.5;
      let readIdx = 0;
      let prev = 0;

      for (let i = 0; i < bufferLength; i++) {
        const current = delayLine[readIdx];
        const filtered = (current + prev) * 0.5 * filterAmount + current * (1 - filterAmount);
        data[i] = filtered;
        delayLine[readIdx] = filtered * damping;
        prev = current;
        readIdx = (readIdx + 1) % period;
      }

      // LRU eviction: drop the oldest entry once cache reaches the cap
      if (this.pluckBufferCache.size >= PLUCK_BUFFER_CACHE_MAX) {
        const oldest = this.pluckBufferCache.keys().next().value;
        if (oldest !== undefined) this.pluckBufferCache.delete(oldest);
      }
      this.pluckBufferCache.set(cacheKey, buffer);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(velocity, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 80;

    source.connect(gain).connect(highpass);
    if (this.masterGain) highpass.connect(this.masterGain);
    if (this.convolver) highpass.connect(this.convolver);

    source.start();
    source.stop(ctx.currentTime + duration + 0.05);
  }

  async pluckMuted(freq: number, velocity = 0.6) {
    const ctx = await this.ensureContext();
    const sampleRate = ctx.sampleRate;

    const duration = 0.12;
    const bufferLength = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferLength, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferLength; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 40);
      data[i] = (Math.random() * 2 - 1) * envelope;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(velocity * 1.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 280;
    lowpass.Q.value = 1.5;

    const thump = ctx.createBiquadFilter();
    thump.type = "peaking";
    thump.frequency.value = 120;
    thump.gain.value = 8;
    thump.Q.value = 2;

    source.connect(gain).connect(lowpass).connect(thump);
    if (this.masterGain) thump.connect(this.masterGain);

    source.start();
    source.stop(ctx.currentTime + duration + 0.02);
  }
}

export const guitarSynth = new GuitarSynth();
