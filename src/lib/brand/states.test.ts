import { describe, expect, it } from "vitest";
import { BUILD_STATES, STATE_WORDS } from "./states";

describe("state spectrum", () => {
  it("names all four states with a word", () => {
    expect(BUILD_STATES).toEqual(["stuck", "diag", "build", "ship"]);
    for (const state of BUILD_STATES) {
      expect(STATE_WORDS[state].length).toBeGreaterThan(0);
    }
  });
});
