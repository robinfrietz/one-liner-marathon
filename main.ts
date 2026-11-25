import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line for the One-Liner Marathon: a single joke, up to 280 characters.
const LINE =
  "I asked my AI assistant for a joke, and it billed me for the laugh.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
// Verify the output by reading it back at byte level: the file must be
// exactly the line we intended, encoded as UTF-8 with no BOM, no trailing
// newline, and no re-encoding surprises — and within the 1-280 char limit.
const raw = readFileSync(target);
const expected = Buffer.from(LINE, "utf8");
if (!raw.equals(expected)) {
  throw new Error(
    `output mismatch: entry.txt bytes (${raw.length}) differ from expected line bytes (${expected.length})`,
  );
}
if (LINE !== Buffer.from(LINE, "utf8").toString("utf8")) {
  throw new Error("entry line is not valid UTF-8 round-trip text");
}
const written = raw.toString("utf8");
if (written.length < 1 || written.length > 280) {
  throw new Error(`output length ${written.length} outside 1-280 chars`);
}
console.log(`wrote ${target} (${LINE.length} chars, ${raw.length} bytes)`);
