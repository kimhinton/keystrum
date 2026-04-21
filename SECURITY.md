# Security Policy

## Supported Versions

The `main` branch of keystrum is the only version that receives updates. Because keystrum is a static client-side web app with no backend, no user data is transmitted, stored, or processed on our servers.

## Reporting a Concern

If you discover an issue that could affect users of [keystrum.app](https://keystrum.app) — for example, a flaw in the service worker, a problematic third-party dependency, or an unintended data leak via localStorage — please report it privately rather than opening a public issue.

**How to report**:

1. Use GitHub's private reporting form: [Report a concern](https://github.com/kimhinton/keystrum/security/advisories/new)
2. Or email the maintainer directly via the contact link on the GitHub profile.

Please include:

- A description of the issue and the version / commit affected
- Steps to reproduce (or a minimal proof-of-concept)
- Any relevant browser, OS, or deployment context
- Your suggested remediation, if you have one

## Response Expectations

- **Acknowledgement**: within 72 hours.
- **Initial assessment**: within 7 days.
- **Fix or mitigation plan**: within 30 days for confirmed high-impact issues.

keystrum is a small open-source project maintained in spare time. Response times are best-effort. If the report is valid and you would like credit, you will be acknowledged in the release notes of the fix.

## Scope

In scope:

- Code hosted at [github.com/kimhinton/keystrum](https://github.com/kimhinton/keystrum)
- The production deployment at [keystrum.app](https://keystrum.app)
- The service worker (`public/sw.js`) and cache behavior
- PWA manifest and icon-generation routes

Out of scope:

- Third-party services (Cloudflare Pages infrastructure, Google Search Console, GitHub itself)
- Issues requiring physical access to the user's device
- Social engineering that does not involve a flaw in the code
- Any submission that requires breaking the [Code of Conduct](CODE_OF_CONDUCT.md) or GitHub's Acceptable Use Policies to reproduce
