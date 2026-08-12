import { describe, expect, test } from "vitest";
import { MODULES } from "../src/index";
import { Registry } from "../src/index";

describe("StarLogo", () => {
  test("spec modules resolve", () => {
    expect(MODULES.length).toBe(3);
  });
  test("core behavior is deterministic", () => {
    const r = new Registry(11);
const ids = r.ids();
expect(ids.length).toBeGreaterThanOrEqual(MODULES.length);
expect(new Set(ids).size).toBe(ids.length);
for (const mod of MODULES) {
  const found = r.lookup(mod.name);
  expect(found.length).toBeGreaterThanOrEqual(1);
  expect(r.get(found[0])).toBe(mod.name);
}
  });
});