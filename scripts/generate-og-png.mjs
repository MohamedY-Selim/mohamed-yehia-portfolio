/**
 * Renders public/og-image.svg to public/og-image.png for social previews.
 * Run: npm run og:image   or via prebuild before vite build.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public", "og-image.svg");
const outPath = join(root, "public", "og-image.png");

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch (e) {
  console.error("[generate-og-png] Install dependencies first: npm install (requires sharp).", e?.message || e);
  process.exit(1);
}

const svg = readFileSync(svgPath);
await sharp(svg, { density: 144 })
  .resize(1200, 630, { fit: "fill" })
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log("[generate-og-png] wrote", outPath);
