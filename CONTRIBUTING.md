# Contributing to keystrum

Thanks for your interest in contributing.

## Getting Started

```bash
git clone https://github.com/kimhinton/keystrum.git
cd keystrum
npm install
npm run dev
```

## Development

- `npm run dev` — Start dev server on port 3000
- `npm run build` — Static export build
- `npm run lint` — Run ESLint

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Run `npm run lint` and `npm run build` — both must pass
4. Open a PR with a clear description of what changed and why

## Code Style

- Follow existing patterns in the file you're editing
- TypeScript strict mode
- Tailwind CSS for styling (no inline styles, no CSS modules)

## Song Contributions

Adding a new song to Practice mode:

1. Edit `src/lib/game/songs.ts`
2. Use the `bars()` helper to convert beat-based timing to absolute timestamps
3. Define `chordMap` with up to 6 lanes (Am, C, Em, G, Dm, F)
4. Test the song end-to-end in the browser before submitting

## Reporting Bugs

Open an issue with:
- What you expected
- What happened instead
- Browser + OS
- Console errors if any

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
