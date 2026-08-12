# StarLogo — structure (standard: docs/REPO_STANDARD.md)

Stack class (seeds/seeds.yaml + package.json + registry/fleet.json must agree):
`backend`

## Layout map

```
fleet/sc-starlogo/
├── assets/
│   ├── models/             # .gltf/.glb/.obj/.fbx
│   ├── textures/           # images used by materials
│   ├── audio/              # .wav/.ogg/.mp3
│   ├── fonts/              # .ttf/.otf/.woff2
│   └── data/               # seed data, configs, datasets
├── docs/
│   └── STRUCTURE.md        # this file
├── src/
│   ├── index.ts            # public API (SPEC, MODULES, core classes)
    ├── server/           # backend services: api, workers, storage adapters (reserved)
│   └── lib/                # core logic — one file per seed module
│       ├── modules.ts      # module registry constants
│       └── rng.ts          # deterministic seeded PRNG
└── tests/
    └── index.test.ts       # green gate: typecheck + deterministic tests
```

## Placement rules (agents follow these)

- Kernel logic: `src/lib/<Module>.ts` — one file per seed module, never merged.
- UI surfaces: `src/ui/` is NOT allowed in a stack-backend repo.
- Backend services: `src/server/` (reserved — add api/workers/storage here).
- Media: `assets/<kind>/` only — never inside `src/`.
