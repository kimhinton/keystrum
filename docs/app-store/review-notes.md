# Review Notes — Apple App Review

These notes go in the **Notes** field of your App Store Connect submission.
They are the ONE place where you talk directly to the human reviewer.

**Length target**: under 800 characters. Reviewers skim.

---

## Submission notes (copy-paste into App Store Connect)

```
Dear Review Team,

keystrum is a musical instrument app — NOT a website wrapper. Key native behaviors:

• Touch-drag strum: drag finger across on-screen keyboard → triggers chord strum with
  stroke direction inferred from touch trajectory (not a webview gesture — custom
  pointer event handling, tested on iPhone + iPad)

• Karplus-Strong synthesis: all audio generated live via physical modeling in native
  WebAudio. No streaming, no servers, no samples. Fully offline.

• Recording: native MediaRecorder captures up to 30 seconds, outputs .m4a, shares
  via native iOS Share sheet or saves to Files app. No upload.

• Standalone mode: works with network disabled. Precached via service worker.

Primary intended use:
  1. iPad + external keyboard (Smart Keyboard or Bluetooth) — full instrument
  2. iPhone touch — "drag to strum" performance mode
  3. Offline practice mode with 3 folk songs + guide animation

To test the distinguishing feature: hit keys 2 → W → S → X in under 200ms
(or touch-drag a column of keys). That's a C major strum. The 90ms window
detection is the core instrument mechanic and is not present in any other
app on the store.

Source code MIT licensed: https://github.com/kimhinton/keystrum
Privacy: zero network calls, zero data collection, no analytics SDK.

Contact: [support email]
Thanks for reviewing.
```

## Demo account

Not applicable — no login, no account, no paywall. Reviewer can use the app fully on first launch.

## Test walk-through for reviewer

If the reviewer opens the support email asking "how do I test the app," send this:

```
Thanks — the key feature is strum detection. On your test device:

iPad + keyboard:   Press '2' then 'W' then 'S' then 'X' as a fast sequence.
                   You should hear a C-major strum.

iPhone touch:      Press-and-drag your finger across a vertical column of keys,
                   top to bottom. Same result — a C-major strum.

From the instrument screen, tap the REC button (top right). Play anything for
10 seconds. Tap Stop. A share sheet appears with the .m4a file — you can save
to Files or send to Messages.

Practice mode is under the /play menu — three songs with an animated guide.

All of this works with Wi-Fi and cellular disabled (the app precaches).
```

## If rejected on 4.2 Minimum Functionality

Reply to the rejection via App Review with:

```
Respectfully requesting reconsideration. keystrum implements native functionality
that materially exceeds a webview wrapper:

1. Custom Pointer Event handler for multi-touch strum detection — implemented
   in src/components/keyboard-guitar/KeyboardGuitar.tsx lines 123-156. This is
   not a webview-default gesture; it's per-column directional inference.

2. WebAudio-based Karplus-Strong synthesis — 148 lines of DSP code generating
   sound live, with no network dependency. Source: packages/synth/src/guitar-synth.ts

3. MediaRecorder capture with iOS-native .m4a output and native Share sheet
   integration. Source: src/components/instrument/RecordBar.tsx

4. Full offline functionality via Service Worker precache. Application works
   with network disabled.

5. Distinct use case on iPad + Magic Keyboard / Smart Folio that no other App
   Store instrument app addresses: physical-keyboard-as-guitar performance.

Happy to demo any of the above via screen recording if helpful. Source code
is publicly MIT-licensed at https://github.com/kimhinton/keystrum for the
review team to inspect.
```

Save that text as `docs/app-store/4.2-response.txt` for quick access if needed.

## DO NOT

- Do not argue on price (you're free — no issue).
- Do not offer to remove features to pass — offer to explain them better instead.
- Do not re-submit without responding to the existing rejection thread.
- Do not escalate to social media — reviewers track this and it can harm subsequent reviews.
