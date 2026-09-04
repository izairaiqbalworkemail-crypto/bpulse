import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brand = join(root, "public", "brand");

const jobs = [
  ["linkedin-cover.svg", "linkedin-cover.png", 1584],
  ["cover.svg", "cover.png", 1200],
  ["profile.svg", "profile.png", 400],
  ["mark.svg", "mark.png", 512],
  ["mark-mono.svg", "mark-mono.png", 512],
];

for (const [src, dest, width] of jobs) {
  const svg = readFileSync(join(brand, src));
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    background: src.includes("mark") ? "rgba(0,0,0,0)" : undefined,
  })
    .render()
    .asPng();
  writeFileSync(join(brand, dest), png);
  console.log(dest, png.length);
}
