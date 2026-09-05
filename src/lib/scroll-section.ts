function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
