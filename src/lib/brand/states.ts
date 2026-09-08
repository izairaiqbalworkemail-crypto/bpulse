/**
 * Three status colours. Stuck is red. Diag and build are amber.
 * Ship is green. Colour always sits on a word.
 */
export const BUILD_STATES = ["stuck", "diag", "build", "ship"] as const;

export type BuildState = (typeof BUILD_STATES)[number];

export type StateGround = "dark" | "paper";

export const STATE_WORDS: Record<BuildState, string> = {
  stuck: "stuck",
  diag: "diagnosing",
  build: "building",
  ship: "shipped",
};

export const STATE_COLOR: Record<
  StateGround,
  Record<BuildState, string>
> = {
  dark: {
    stuck: "var(--color-stuck)",
    diag: "var(--color-diag)",
    build: "var(--color-build)",
    ship: "var(--color-ship)",
  },
  paper: {
    stuck: "var(--color-stuck-p)",
    diag: "var(--color-diag-p)",
    build: "var(--color-build-p)",
    ship: "var(--color-ship-p)",
  },
};
