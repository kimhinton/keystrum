# App Store Submission Kit — keystrum

This directory contains everything needed to submit keystrum to Apple App Store and Google Play Store.

## Files

| File | Purpose |
|------|---------|
| `descriptions.md` | Copy-paste descriptions, subtitles, promotional text for both stores |
| `keywords.md` | iOS ASO keywords (100-char limit) + Google Play tags |
| `review-notes.md` | Apple Reviewer notes — **critical** for 4.2 Minimum Functionality defense |
| `screenshots.md` | Required screenshot specs + capture checklist |

## One-time account setup (user responsibility)

- Apple Developer Program: $99 USD / year. Enroll at https://developer.apple.com/programs/ — individual enrollment takes ~24-48 hours.
- Google Play Console: $25 USD one-time. Register at https://play.google.com/console.
- App Store Connect: create an app record named "keystrum" with bundle ID `app.keystrum`.
- Google Play Console: create an app in internal testing track first.

## Build pipeline

- **Android AAB**: GitHub Actions workflow `android-build` → upload to Play Console internal testing.
- **iOS IPA (signed)**: Requires signing config — see `../../.github/workflows/ios-build.yml` note block. Once configured, tag a release `v0.1.0` → upload to App Store Connect via altool or Fastlane Pilot.

## Submission timeline

| Step | Estimated time |
|------|----------------|
| Account enrollment + bundle ID setup | 1-2 days |
| Asset preparation (screenshots, icon, preview video) | 1 day |
| First submission | 2-3 hours (uploading + metadata) |
| **Apple review** (first submission) | 1-3 days typical in 2026 |
| **Apple review** (rejection → revise → re-submit) | +1-3 days per cycle |
| **Google Play review** | Hours to 1 day |

## Rejection preparedness

The most likely Apple rejection is **Guideline 4.2 Minimum Functionality**: "apps that are not functional or a webview wrapper."

Defense strategy — apply all of these to reduce rejection risk:

1. **Emphasize native-feeling features in metadata**:
   - Touch-drag strum performance
   - 30-second audio recording → share to native iOS/Android share sheet
   - Local file save (M4A on iOS, WebM on Android)
   - Works offline (PWA service worker + bundled assets)
2. **Include "iPad + external keyboard" as a primary use case** in the app description.
3. **Reviewer notes file** explaining each above point with a "how to test" walkthrough.
4. **At least 3 screenshots** showing distinct native behaviors: touch-strum, recording UI, practice mode game.

If rejected, respond within 7 days with a clarification in App Review; don't re-submit without engaging the existing review thread.
