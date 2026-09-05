import { describe, expect, it } from "vitest";
import { lots } from "@/content/lots";
import { TRACE_SIZES, buildLotTrace, specFromLot } from "./lot-trace";

describe("lot traces", () => {
  const traces = lots.map((lot) => ({
    slug: lot.slug,
    built: buildLotTrace(specFromLot(lot), TRACE_SIZES.full.width, TRACE_SIZES.full.height),
  }));

  it("is deterministic for the same lot", () => {
    for (const lot of lots) {
      const spec = specFromLot(lot);
      const a = buildLotTrace(spec, 480, 120);
      const b = buildLotTrace(spec, 480, 120);
      expect(a.path).toBe(b.path);
      expect(a.description).toBe(b.description);
    }
  });

  it("gives every lot a visually distinct path", () => {
    const paths = traces.map((item) => item.built.path);
    expect(new Set(paths).size).toBe(lots.length);
  });

  it("states the arrival in the accessible description", () => {
    for (const lot of lots) {
      const built = buildLotTrace(specFromLot(lot), 480, 120);
      expect(built.description).toContain(lot.grade.label);
    }
  });

  it("labels a deflection for each finding", () => {
    for (const lot of lots) {
      const spec = specFromLot(lot);
      const built = buildLotTrace(spec, 480, 120);
      expect(built.marks.length).toBe(spec.findings.length);
    }
  });
});
