# ParseCNP — Agent Guide

## Commands (must-run in order for CI equivalence)

```bash
pnpm install --frozen-lockfile
pnpm test        # vitest run (10 test files, 52 tests)
pnpm typecheck   # tsc --noEmit (strict mode)
pnpm build       # tsdown → dist/index.mjs + dist/index.d.mts (ESM)
```

Single test file: `TZ='Europe/London' npx vitest run src/CnpParser.test.ts`

Coverage: `pnpm coverage` (vitest --coverage).

## Quirks

- **Language is TypeScript** — strict mode, ES modules, bundled by tsdown (rolldown). Entrypoint is `src/index.ts`.
- **Tests require `TZ='Europe/London'`** — date-assertion stability across environments. Add to vitest config if running globally.
- **`month` getter is 1-indexed** (`this.birthdate.getMonth() + 1`). Date internals remain 0-indexed.
- **Sex code doubles as century selector** (1-2→1900s, 3-4→1800s, 5-6→2000s, 7-9→resident logic using current year).
- **Factory pattern** — `ParseCnp(cnp)` or `new ParseCnp(cnp)` both return a `CnpParser` instance. Static `ParseCnp.isValid()` and `ParseCnp.validate()` also available.
- **County codes 47, 48** exist in `countyList.ts` but return `{ ISO: undefined, name: undefined }` — historical București sectors abolished in 1979. Temporal validation is enforced in `isCountyValid`/`validateCounty`.
- **County codes 51, 52** (Călărași, Giurgiu) and **23** (Ilfov) also have temporal validation — valid only after their creation/re-establishment dates.
- **Package manager is pnpm** — CI uses `pnpm install --frozen-lockfile`. Do not use `npm install` or `yarn`.
- **Assertions use `vitest`** (`expect(x).toEqual(y)`, `expect(x).toBeNull()`, etc.).
- **`serial`** and **`checksum`** getters return `number`, not `string`.
- **`toJSON()`** returns a plain object (not a JSON string).

## Branches

- **`master`** — original JS (Babel/Rollup/Mocha/Yarn). Production releases.
- **`feature/modernize-infra-only`** — JS source unchanged, infra only (pnpm/Vitest/tsc). No behavioral changes. Minor/patch semver.
- **`feature/modernize-code-changes`** — TS migration + new API features on top of infra. Breaking changes. Major semver.

## Architecture

### Entry Point Flow

The library uses a factory pattern via the interface-merged `ParseCnp()` function. Called with or without `new`, it returns a `CnpParser` instance. Static methods `ParseCnp.isValid()` and `ParseCnp.validate()` are also available.

### Module Layout

```
src/index.ts       — entrypoint: factory function + static isValid/validate
src/CnpParser.ts   — core class: parses raw CNP (13-digit regex), exposes typed getters, aggregates validators
src/types.ts       — shared interfaces (ParsedCnp, RawCnp, County, ValidationError, Sex, etc.)
src/countyList.ts  — static county lookup table (all 52 codes + code 70)
src/utils.ts       — isValidDate helper
src/parsers/       — per-segment parser functions (sex, date, county)
src/validators/    — per-segment validator functions (sex, date, county, serial, checksum) + helpers
```

### Module Convention

Each CNP segment has a matching pair in `parsers/` (raw → human-readable) and `validators/` (raw → boolean + error). All modules have co-located `.test.ts` files (52 tests total).

### Checksum Algorithm

Constant `279146358279`. Multiply each of the first 12 CNP digits by the corresponding constant digit, sum, `% 11`. If remainder is 10 → checksum is 1, else checksum is the remainder.

## CI

PRs to `master`: `pnpm test` → `pnpm build` on Node 22. Publishing: npm Trusted Publishing (OIDC) on GitHub release, Node 24.
