"use client";

import { Filesystem, Directory } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { isNative } from "./platform";

const INDEX_KEY = "keystrum.library.index";

export interface LibraryEntry {
  id: string;
  name: string;
  createdAt: number;
  durationMs: number;
  mimeType: string;
  path: string;
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const s = typeof reader.result === "string" ? reader.result : "";
      const comma = s.indexOf(",");
      resolve(comma >= 0 ? s.slice(comma + 1) : "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function base64ToBlob(base64: string, mimeType: string): Blob {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mimeType });
}

async function readIndex(): Promise<LibraryEntry[]> {
  try {
    const { value } = await Preferences.get({ key: INDEX_KEY });
    if (!value) return [];
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as LibraryEntry[]) : [];
  } catch { return []; }
}

async function writeIndex(entries: LibraryEntry[]): Promise<void> {
  await Preferences.set({ key: INDEX_KEY, value: JSON.stringify(entries) });
}

export async function saveRecording(blob: Blob, durationMs: number): Promise<LibraryEntry | null> {
  if (!isNative()) return null;
  const id = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now());
  const ext = blob.type.startsWith("audio/mp4") ? "m4a" : "webm";
  const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  const filename = `keystrum-${ts}.${ext}`;
  const path = `keystrum/${filename}`;
  try {
    const base64 = await blobToBase64(blob);
    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Data,
      recursive: true,
    });
    const entries = await readIndex();
    const idx = entries.length + 1;
    const entry: LibraryEntry = {
      id,
      name: `Recording ${idx}`,
      createdAt: Date.now(),
      durationMs,
      mimeType: blob.type,
      path,
    };
    await writeIndex([entry, ...entries]);
    return entry;
  } catch (err) {
    console.warn("[library] save failed", err);
    return null;
  }
}

export async function listRecordings(): Promise<LibraryEntry[]> {
  if (!isNative()) return [];
  return readIndex();
}

export async function loadRecordingBlob(entry: LibraryEntry): Promise<Blob | null> {
  if (!isNative()) return null;
  try {
    const res = await Filesystem.readFile({
      path: entry.path,
      directory: Directory.Data,
    });
    const data = typeof res.data === "string" ? res.data : "";
    if (!data) return null;
    return base64ToBlob(data, entry.mimeType);
  } catch (err) {
    console.warn("[library] load failed", err);
    return null;
  }
}

export async function deleteRecording(entry: LibraryEntry): Promise<void> {
  if (!isNative()) return;
  try {
    await Filesystem.deleteFile({
      path: entry.path,
      directory: Directory.Data,
    });
  } catch { /* file may already be gone */ }
  const entries = await readIndex();
  await writeIndex(entries.filter((e) => e.id !== entry.id));
}

/**
 * Export a saved recording to device Documents (public, user-visible in Files app on iOS / Downloads on Android).
 * Returns the exported absolute URI or null on failure.
 */
export async function exportToDocuments(entry: LibraryEntry): Promise<string | null> {
  if (!isNative()) return null;
  const blob = await loadRecordingBlob(entry);
  if (!blob) return null;
  try {
    const base64 = await blobToBase64(blob);
    const ext = entry.mimeType.startsWith("audio/mp4") ? "m4a" : "webm";
    const ts = new Date(entry.createdAt).toISOString().slice(0, 19).replace(/[:T]/g, "-");
    const filename = `keystrum-${ts}.${ext}`;
    const res = await Filesystem.writeFile({
      path: filename,
      data: base64,
      directory: Directory.Documents,
    });
    return res.uri;
  } catch (err) {
    console.warn("[library] export failed", err);
    return null;
  }
}
