import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line for the One-Liner Marathon: a single joke, up to 280 characters.
const LINE =
  "I asked my AI assistant for a joke, and it billed me for the laugh.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
// Verify the output by reading it back: it must be exactly the line we
// intended, and within the competition's 1-280 character limit.
const written = readFileSync(target, "utf8");
if (written !== LINE) {
  throw new Error(`output mismatch: entry.txt differs from expected line`);
}
if (written.length < 1 || written.length > 280) {
  throw new Error(`output length ${written.length} outside 1-280 chars`);
}
console.log(`wrote ${target} (${LINE.length} chars)`);
