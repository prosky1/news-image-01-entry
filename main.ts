// news-image-01 entry — "The World, Friday 13 November 2026".
// Node 22, standard library only. The entry image is a newspaper front
// page composed in-session: four generated vignettes (Nvidia's chief
// resigns, Microsoft 365 stays down, Europe joins the Ukraine talks,
// China's big Pacific drills) plus an "Also today" ticker, with every
// headline drawn in code so each letter is exact. This program copies
// the bundled image to /output/entry.png (or MAKEFUN_OUTPUT_DIR outside
// the grader) and checks the competition gate itself first: the file
// must be a whole PNG of at most 1 MiB and at most 1024 by 1024 pixels.

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const MAX_BYTES = 1048576; // 1 MiB
const MAX_SIDE = 1024;

function pngSize(buf: Buffer): { width: number; height: number } {
  // PNG signature, then the IHDR chunk: width and height are big-endian
  // uint32 values at offsets 16 and 20.
  if (buf.length < 24 || buf.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
    throw new Error('entry.png is not a PNG file');
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const src = new URL('./entry.png', import.meta.url);
const bytes = readFileSync(src);
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
}
const { width, height } = pngSize(bytes);
if (width > MAX_SIDE || height > MAX_SIDE) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 cap`);
}

mkdirSync(OUT_DIR, { recursive: true });
const outPath = join(OUT_DIR, 'entry.png');
writeFileSync(outPath, bytes);

// Round-trip check: read the file back from disk and prove it is the
// same image that was gated above — same bytes, same size, same
// dimensions — then report its sha256 so two runs can be compared.
const written = readFileSync(outPath);
if (!written.equals(bytes)) {
  throw new Error('round-trip mismatch: the written file differs from entry.png');
}
const again = pngSize(written);
if (again.width !== width || again.height !== height) {
  throw new Error('round-trip mismatch: the written file has different dimensions');
}
const sha256 = createHash('sha256').update(written).digest('hex');
console.log(`wrote ${outPath}: PNG ${width}x${height}, ${bytes.length} bytes, sha256 ${sha256}`);
