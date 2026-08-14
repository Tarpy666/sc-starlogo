# RESEARCH_AND_DISTINCTION — research log, verified limits, and the repository distinction framework

> Companion to `docs/10K_SOLID_PLAN.md` and `docs/100M_REPO_PLAN.md`. This file
> records the research behind the fleet's naming/branding/competitor-scaffolding
> system, the verified platform constraints those plans rely on, and the legal
> guardrails that keep the machinery honest. Research snapshot: 2026-08-12.

## 1 · Verified platform research (numbers, not vibes)

| constraint | number | source |
|---|---|---|
| repos per GitHub owner (user **or** org) | **100,000** (raised Apr 2025) | github.blog changelog 2025-03-27 repository-ownership-limits |
| warning banner at ~50k | admin emails + banner | docs.github.com · repository-limits |
| creation blocked at 100k | distribute across orgs | docs.github.com · repository-limits |
| content-creating API | 80/min · 500/hr per token | docs.github.com · REST rate limits |
| concurrent API requests | 100 | docs.github.com · REST rate limits |
| REST point budget | 900 pts/min (mutating ≈ 5 pts) | docs.github.com · REST rate limits |
| mass fake-account creation | **ToS violation** — not a scaling lever | github.com/terms |
| Gitea/Forgejo self-hosted | no API ceiling; disk/CPU/DB bound | measured spike: 0.88 s/repo |
| sample verification math | must be published, sampler honesty | fleet standard (Maat's feather) |

**Implication for the fleet:** GitHub ≤ 100k/owner → flagship/showcase only.
Self-hosted Forgejo worlds are the volume engine (see 100M_REPO_PLAN §2).
No plan in this repo depends on a limit that was not checked against a
primary source.

## 2 · The distinction framework (what makes a repo *distinct*)

Every repo in the fleet differs on four axes; a repo that differs on none of
them is a re-push and does not count:

| axis | definition | artifact |
|---|---|---|
| **name** | unique system identifier, family-prefixed (`l2l-*.ax`, `vs-*.ax`, `3a-*.ax`, `axn-*.ax`) | repo name, manifest |
| **branding leaves** | visual token, sprite, meaning — one sprite per family, unique meaning fleet-wide | `BRAND.md`, `brand/sprites.mjs` |
| **competitor scaffolding** | documented target it replaces or disrupts | `VERSUS.md` |
| **scratch tool** | the standalone utility/algorithm/SDK/MCP the repo hosts | `PLAN.md` §utility, `--self-test` |

Deconstruction rule: a component may be split into its own repo **only if**
the split copy carries its own four axes and passes its own gates. Copying a
file is not a distinction; re-branding + re-scaffolding + its own green gate
is one.

## 3 · Workstream model (orchestration, not vibes)

| stream | role | output |
|---|---|---|
| Alpha | nomenclature + branding leaves + `AGENTS.md` brief | names, `BRAND.md`, `VERSUS.md` scaffold |
| Beta | real code population, in place, zero-dep | engine replaces shell validator; `--self-test` contract kept |
| Gamma | legal guardrails + attribution tables | `LICENSE` (own code only), `THIRD_PARTY.md`, `SECURITY.md` |
| Delta | WebXR/TUI/UI consistency layer | `webxr-tui.config.yaml`, `webxr-ui.config.yaml`, floating-PBR styles |
| Epsilon | AI harness + self-patching | local `bai` logic, telemetry, agents |

Streams advance in waves (d → e → f → g per 10K_SOLID_PLAN §3); no stream
creates a repo that another stream hasn't spawned a shell for.

## 4 · Legal guardrails (documented, not assumed)

These are the lines the fleet operates on. The alternative framing — "a
custom license makes third-party assets legal" — is false; no LICENSE file
grants rights over rights the author does not own.

- **Own code is ours.** License, brand, and monetization freedom apply to
  code, assets, and writing created in this fleet.
- **Clean-room reimplementation is legal.** Studying a target's *public*
  interface/behavior and writing original logic is a lawful path to a
  competing tool. This is what `VERSUS.md` documents per repo.
- **Parody is a narrow, fact-specific fair-use defense** — it is not a
  declaration in a README, and it does not cover selling reskins of
  copyrighted characters (Sonic-as-Simpsons, Spider-Man, etc.).
- **No extraction-and-redistribution of ROM/APK assets.** Extracting
  textures/meshes from commercial titles and shipping them in retail repos
  is reproduction of protected expression; the fleet does not do it for
  release tracks. Extraction for private, non-distributed study stays
  outside the repo pipeline.
- **Attribution is mandatory, not optional.** `THIRD_PARTY.md` exists per
  repo; unknown provenance = asset not used.
- **"Replacing" a platform ≠ reproducing it.** The fleet's games/tools are
  original implementations with their own names, stories, and architecture.

## 5 · WebXR UI consistency standard

- Everything live (not archival) renders through the shared WebXR/TUI layer:
  fonts as floating PBR textures, GLB favicons/buttons, transparent vanilla-JS
  DOM overlays, optional footer game canvas.
- Device-agnostic by construction: the same layer serves web, mobile, and
  emulator-hosted surfaces. XR is the default substrate, not a retrofit.

## 6 · Open items (hindsight, not promises)

- Rotate any token that has been pasted in plaintext in chat; env-only, ignored
  files otherwise.
- Self-hosted Forgejo world list is the engine (pantheon table in
  100M_REPO_PLAN §8); GitHub orgs are showcase only.
- Sample-based verification math to be published in the portal before waves
  pass 100k.

_cute on the outside, unholy on the inside — research is only as good as the
gate that refuses to ship past it._