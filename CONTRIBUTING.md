# Contributing to keystrum

Thanks for your interest in contributing.

## Getting Started

```bash
git clone https://github.com/kimhinton/keystrum.git
cd keystrum
pnpm install
pnpm run dev
```

Requires **pnpm ≥ 10** and **Node ≥ 22** (matches CI).

## Development

- `pnpm run dev` — Start dev server on port 3000
- `pnpm run build` — Static export build (outputs to `out/`)
- `pnpm run lint` — Run ESLint
- `pnpm exec tsc --noEmit` — Type check

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Run `pnpm run lint`, `pnpm exec tsc --noEmit`, and `pnpm run build` — all three must pass (CI enforces this)
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
