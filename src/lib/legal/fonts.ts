import { Font } from "@react-pdf/renderer";
import { readFileSync } from "node:fs";
import path from "node:path";

const FONT_DIR = path.join(process.cwd(), "src", "lib", "legal", "fonts");

function ttfDataUri(file: string): string {
  const data = readFileSync(path.join(FONT_DIR, file));
  return `data:font/ttf;base64,${data.toString("base64")}`;
}

let registered = false;

/** Real bpulse typeface set, bundled locally under OFL. */
export function registerLegalFonts() {
  if (registered) return;
  registered = true;
  Font.register({
    family: "Plex Sans",
    fonts: [
      { src: ttfDataUri("IBMPlexSans-Regular.ttf"), fontWeight: 400, fontStyle: "normal" },
      { src: ttfDataUri("IBMPlexSans-Italic.ttf"), fontWeight: 400, fontStyle: "italic" },
      { src: ttfDataUri("IBMPlexSans-Medium.ttf"), fontWeight: 500, fontStyle: "normal" },
      { src: ttfDataUri("IBMPlexSans-MediumItalic.ttf"), fontWeight: 500, fontStyle: "italic" },
      { src: ttfDataUri("IBMPlexSans-SemiBold.ttf"), fontWeight: 600, fontStyle: "normal" },
    ],
  });
  Font.register({
    family: "Plex Mono",
    fonts: [
      { src: ttfDataUri("IBMPlexMono-Regular.ttf"), fontWeight: 400 },
      { src: ttfDataUri("IBMPlexMono-Medium.ttf"), fontWeight: 500 },
    ],
  });
  Font.register({
    family: "Newsreader",
    fonts: [
      { src: ttfDataUri("Newsreader-Regular.ttf"), fontWeight: 400 },
      { src: ttfDataUri("Newsreader-Medium.ttf"), fontWeight: 500 },
      { src: ttfDataUri("Newsreader-SemiBold.ttf"), fontWeight: 600 },
    ],
  });
}

let logoDataUriCache: string | null = null;

/** bpulse mark as a data URI so the PDF engine can embed it in Node. */
export function legalLogoDataUri(): string {
  if (logoDataUriCache) return logoDataUriCache;
  const file = path.join(
    process.cwd(),
    "public",
    "bpulse-brand",
    "mark",
    "bpulse-mark-dark-1024.png"
  );
  const data = readFileSync(file);
  logoDataUriCache = `data:image/png;base64,${data.toString("base64")}`;
  return logoDataUriCache;
}