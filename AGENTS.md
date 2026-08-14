# AGENTS.MD

<!-- research-meta:begin
research-meta:
  version: 1
  family: fleet
  distinction-axes: [branding-leaves, competitor-scaffolding, scratch-tool, deconstruction]
  research-domains: [repo-infra, license-gates, spatial-ui, webgpu-wgsl, webrtc-p2p, sqlite-wal, workstream-orchestration]
  spdx: MIT
  references: [docs/RESEARCH_AND_DISTINCTION.md, docs/BRANDY_SYSTEM_DOCUMENTATION.md]
research-meta:end -->

## Mission

Part of the Counted fleet (fleet). Ship real code, keep every gate green,
keep attribution intact. Research grounding: docs/RESEARCH_AND_DISTINCTION.md
(distinction axes) and docs/BRANDY_SYSTEM_DOCUMENTATION.md (system reference).

## Hard rules

- Never weaken a gate to make a test pass; fix the module.
- Never strip LICENSE/COPYING/NOTICE or provenance files.
- Unknown-license assets stay quarantined, never shipped.
- No tokens in the tree; env-only, ignored files otherwise.
- Bounded loops: goal, verify gate, named terminal state. No "until happy".
