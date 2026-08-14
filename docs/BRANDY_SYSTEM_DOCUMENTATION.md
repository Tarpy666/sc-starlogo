# BRANDY_SYSTEM_DOCUMENTATION — research record, meta distinctions, and system reference

> Complete documentation of the research, meta distinctions, and machinery in this
> repo. Written 2026-08-12. Companion files: `docs/RESEARCH_AND_DISTINCTION.md`,
> `docs/10K_SOLID_PLAN.md`, `docs/100M_REPO_PLAN.md`, `docs/REPO_FACTORY.md`,
> `docs/REPO_STANDARD.md`. Everything here is verifiable against the files it
> names; every number in §1 was checked against a primary source.

---

## 1 · Research record (verified constraints)

| constraint | number | source |
|---|---|---|
| repos per GitHub owner (user **or** org) | **100,000** (raised Apr 2025; was 1,500/5,000) | github.blog changelog 2025-03-27 repository-ownership-limits |
| warning banner at ~50k | admin emails + banner | docs.github.com · repository-limits |
| creation blocked at 100k | distribute across orgs | docs.github.com · repository-limits |
| content-creating API | 80/min · 500/hr per token | docs.github.com · REST rate limits |
| concurrent API requests | 100 | docs.github.com · REST rate limits |
| REST point budget | 900 pts/min (mutating ≈ 5 pts) | docs.github.com · REST rate limits |
| mass fake-account creation | **ToS violation** — not a scaling lever | github.com/terms |
| Gitea/Forgejo self-hosted | no API ceiling; disk/CPU/DB bound | measured spike: 0.88 s/repo, 40 repos/35 s single-thread |
| storage burn (self-hosted fleet) | ~3 MB/repo all-in | 100M_REPO_PLAN M0 spike |
| sample verification | published sampler math required past 100k | fleet standard (Maat's feather) |

**Implications (decided, not guessed):**
- GitHub ≤ 100k/owner → flagship/showcase only, curated (option C in
  `docs/100M_REPO_PLAN.md` §2).
- Self-hosted Forgejo/Forgejo-compatible worlds are the volume engine; each
  pantheon world is independent (own forge, own queue, own lock).
- No mass fake accounts, ever. Tokens env-only, `.env`/`.data/`/`artifacts/`
  ignored, ripgrep secret scan before hub commits.

## 2 · Meta distinctions framework

Every repo in the fleet differs on four axes; a repo that differs on none of
them is a re-push and does not count toward a milestone.

| axis | definition | artifact |
|---|---|---|
| **name** | unique system identifier, family-prefixed | repo name, `manifest.json` |
| **branding leaves** | visual token, sprite, meaning — one sprite per family, unique meaning fleet-wide | `BRAND.md`, `brand/sprites.mjs` |
| **competitor scaffolding** | documented target it replaces or disrupts | `VERSUS.md` |
| **scratch tool** | the standalone utility/algorithm/SDK/MCP the repo hosts | `PLAN.md` §utility, `--self-test` |

Deconstruction rule: a component may be split into its own repo **only if**
the split copy carries its own four axes and passes its own gates.

### Naming families (wave-d catalog, `docs/10K_SOLID_PLAN.md` §2)

| family | count | kind |
|---|---|---|
| `l2l-*.ax` | 40 | scratch tools / infra engines (git, sql, kv, search, queue, bus, iam, ci, cd, led, bill, ts, vec, …) |
| `vs-*.ax` | 40 | enterprise/internet replacements (slack, github, notion, stripe, s3, spotify, datadog, …) |
| `3a-*.ax` | 40 | triple-A games from scratch (racing, souls, rts, br, mmo, city, tycoon, …) |
| `axn-*.ax` | 10 | agents (code, browse, mail, research, sysop, sec, data, sales, recruit, voice) |

Every shell ships: `AGENTS.md`, `PLAN.md`, `VERSUS.md`, `SECURITY.md`,
`BRAND.md`, `manifest.json`, zero-dep shell validator + `--self-test`,
`PLANET.md` + `configs/*.chamber.yaml`, `webxr-tui.config.yaml` +
`webxr-ui.config.yaml`, `deploy/` (Dockerfile, nginx COOP/COEP, CNAME,
compose), `.env.example`, CI.

### WebXR UI consistency standard

- Everything live (not archival) renders through the shared WebXR/TUI layer:
  fonts as floating PBR textures, GLB favicons/buttons, transparent vanilla-JS
  DOM overlays, optional footer game canvas.
- Device-agnostic by construction: the same layer serves web, mobile, and
  emulator-hosted surfaces. XR is the default substrate, not a retrofit.

## 3 · Workstream model

| stream | role | output |
|---|---|---|
| Alpha | nomenclature + branding leaves + `AGENTS.md` brief | names, `BRAND.md`, `VERSUS.md` scaffold |
| Beta | real code population, in place, zero-dep | engine replaces shell validator; `--self-test` contract kept |
| Gamma | legal guardrails + attribution tables | `LICENSE` (own code only), `THIRD_PARTY.md`, `SECURITY.md` |
| Delta | WebXR/TUI/UI consistency layer | `webxr-tui.config.yaml`, `webxr-ui.config.yaml`, floating-PBR styles |
| Epsilon | AI harness + self-patching | local `bai` logic, telemetry, agents |
| Brandy | re-scaffolding pipeline (§4) | ledger-tracked INGESTED→COMPLIED repos |

Workstream definitions are data in `workstreams/*.yaml`; run with
`npm run generate -- --defs workstreams`. Current defs: `example.yaml`,
`research.yaml`, `governance.yaml`, `audit.yaml`, `population.yaml`,
`ws-webwave-v1.yaml`, `brandy.yaml`.

## 4 · Brandy re-scaffolding pipeline (`src/lib/brandy/`)

A 5-stage pipeline that ingests open-source repositories, strips harness/UI
noise, translates math logic to WGSL, and records everything in a SQLite
ledger — with a hard **license gate** in the middle. Full inventory:

| module | purpose | key API |
|---|---|---|
| `license.ts` | SPDX detection + compliance verdicts | `detectLicense(files)`, `verdict(info, {denySpdx})`, `classifySpdx` |
| `ledger.ts` | WAL SQLite ledger, statuses + counters | `register`, `setStatus`, `recordMetrics`, `increment`, `snapshot` |
| `sourcer.ts` | shallow clone, detach history, provenance + content hash | `GitSourcer.ingest(ref, {dir, url})` |
| `crawler.ts` | recursive crawl, ignored dirs | `listFiles(dir, {extensions, ignoredDirs})` |
| `stripper.ts` | tokenizer-aware UI/console statement stripping | `stripSource(code)` |
| `translator.ts` | recursive-descent JS-math → WGSL | `translateToWgsl(expr)`, `buildKernel`, `extractMathFunctions` |
| `gpu.ts` | WGSL kernel template + WebGPU wrapper (client-side) | `wgslKernel(expr)`, `acquireGpu()`, `initGpuCompute` |
| `mesh.ts` | WebRTC data-channel mesh (client-side) | `BrandyMesh.connect/broadcast` |
| `signaling.ts` | WebSocket signaling compass (`ws`) | `SignalingCompass.start(port)/close()` |
| `analytics.ts` | value scoring + fleet report | `scoreRepo`, `valueReport` |
| `orchestrator.ts` | the 5-stage controller with gates | `BrandyClusterController.runOne/runMany` |

### Ledger schema

- `repos(repo_id PK, source_url, local_path, license, status, content_hash, updated_at)`
  — status ∈ `INGESTED | STRIPPED | TRANSLATED | REBUILT | COMPLIED | FAILED`
- `code_metrics(repo_id PK, function_count, stripped_bytes, gpu_kernels)`
- `allocation_counter(phase, total)` — phases `fork | extract | strip | rebuild | deploy`
- WAL + `synchronous=NORMAL` + `foreign_keys=ON` (matches `src/engine/store.ts` pattern)

### Pipeline stages (per repo, in order)

1. **Fork** — `register` + clone (deep-1) + detach `.git` + content hash; writes
   `BRANDY_PROVENANCE.md` (source, date, hash, license) into the tree.
2. **Extract/Strip** — crawl sources; strip console/document/window statements,
   `debugger`, UI-framework imports. Outputs written to `brandy/out/`; originals
   untouched. **License files and provenance are never stripped.**
3. **License GATE** — SPDX detect → `verdict`. Unknown license ⇒ `FAILED`
   (kept private, quarantined). Attribution files missing after strip ⇒ `FAILED`.
4. **Rebuild** — extract simple math functions → translate to WGSL →
   write `shaders/*.wgsl` kernels.
5. **Deploy-ready** — metrics recorded, counters incremented, status `COMPLIED`.
   Actual publish is operator-gated and out of band.

### Gates (the feather)

- License gate: unknown license or stripped attribution ⇒ `FAILED`, never shipped.
- Network gate: `allowNetwork: false` (default) refuses to clone.
- Self-test gate: every fleet repo must `--self-test` green, from
  `docs/10K_SOLID_PLAN.md` §1.
- Secret hygiene: tokens env-only, ignored files, ripgrep scan before hub commits.

## 5 · Test suites (`tests/brandy-*.test.ts`)

| suite | covers |
|---|---|
| `brandy-license.test.ts` | MIT/GPL detection, package.json fallback, unknown gate, deny list, copyleft flags |
| `brandy-ledger.test.ts` | statuses, counters, metrics, persistence across reopen, invalid-status guards |
| `brandy-stripper.test.ts` | console/document removal, assignment kept, UI-import removal, string/comment/template safety, multiline calls, debugger |
| `brandy-translator.test.ts` | Math.sin/pow/constants, unary/precedence/modulo, error cases, kernel wrap, function extraction |
| `brandy-crawler.test.ts` | ignoring node_modules/dist, custom extensions |
| `brandy-orchestrator.test.ts` | full pipeline → COMPLIED, unknown-license FAILED, copyleft obligations, network gate |
| `brandy-signaling.test.ts` | register/relay between nodes, drop to unknown target |
| `brandy-analytics.test.ts` | scoring verdicts, value report compliance ratio |

Run: `npm test` (vitest) and `npm run typecheck` (tsc --noEmit, strict).

## 6 · Legal guardrails (as enforced by the pipeline)

The alternative framing — "a custom license makes third-party assets legal" —
is false; no LICENSE file grants rights over rights the author does not own.
The pipeline therefore documents and enforces what is actually lawful:

- Own code is ours: license, brand, monetization freedom for fleet-original code.
- Clean-room reimplementation is legal and is what `VERSUS.md` records.
- Parody is a narrow, fact-specific fair-use defense, not a README declaration.
- No extraction-and-redistribution of ROM/APK assets in release tracks;
  attribution (`LICENSE`/`COPYING`/`NOTICE`/`BRANDY_PROVENANCE.md`) is retained
  by gate, not by good intentions.
- Unknown provenance = asset not used (`THIRD_PARTY.md` per repo).

## 7 · Repo map (where things live)

| path | content |
|---|---|
| `docs/` | plans, standards, research, system documentation |
| `src/lib/brandy/` | the re-scaffolding pipeline (this doc §4) |
| `src/engine/`, `src/swarm/`, `src/defs/`, `src/provider/` | workstream swarm core |
| `workstreams/*.yaml` | workstream definitions as data |
| `scripts/` | fleet generators (populate, finish, audit, research, organize) |
| `registry/`, `seeds/`, `fleet/`, `fleet-games/` | manifests, seeds, fleet repos |
| `tests/` | vitest suites (brandy + swarm core) |
| `webxr-tui.config.*`, `webxr-ui.config.*`, `boba-tui.config.yaml` | UI consistency configs |

## 8 · Open items (hindsight, not promises)

- Rotate any token that has been pasted in plaintext in chat; env-only, ignored
  files otherwise. A leaked token is a compromised token.
- Self-hosted Forgejo worlds are the engine (pantheon table in
  `docs/100M_REPO_PLAN.md` §8); GitHub orgs are showcase only.
- Publish sampler math in the portal before waves pass 100k.
- Search index beyond the ledger (SQLite/LMDB shards of 100k rows) when the
  vault outgrows direct crawl.