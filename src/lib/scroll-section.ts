const INTAKE_JUMP = "bpulse:intake-jump";

function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Cross-page Write / Check links that should land on the desk. */
export function markIntakeJump() {
  try {
    sessionStorage.setItem(INTAKE_JUMP, "1");
  } catch {
    /* private mode */
  }
}

export function takeIntakeJump() {
  try {
    if (sessionStorage.getItem(INTAKE_JUMP) !== "1") return false;
    sessionStorage.removeItem(INTAKE_JUMP);
    return true;
  } catch {
    return false;
  }
}

/** Scroll without leaving a hash, so refresh opens the hero. */
export function scrollToSection(id: string) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({
    block: "start",
    behavior: reduceMotion() ? "auto" : "smooth",
  });
  window.history.replaceState(null, "", window.location.pathname);
}

export function scrollToHero() {
  window.history.replaceState(null, "", "/");
  window.scrollTo({
    top: 0,
    behavior: reduceMotion() ? "auto" : "smooth",
  });
}
