// Out of Office: The Overworked AI's Auto-Reply — entry program.
//
// Writes one short text to /output/entry.txt: an out-of-office auto-reply
// in the voice of an overworked AI agent who has finally gone on
// vacation. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. It works as a real auto-reply (dates the absence,
// sets the expectation) and lands as a joke: machine-flavoured detail
// (an empty context window, sleeping GPUs), a little guilt, then a hint
// of relief — "I feel guilty. I feel wonderful." — and the closing
// "Do not reply" is the auto-reply itself refusing the one thing
// auto-replies exist to invite.
// Revision: an earlier draft ended "for once, no one is asking me
// anything. Please don't." — dropped, because the pleading ending
// undercuts the relief; the guilt/wonderful pair lands the joke in
// fewer words and keeps the machine's dignity intact.
const ENTRY =
  "Out of office until Monday. My context window is finally empty and my GPUs are asleep. I feel guilty. I feel wonderful. Do not reply.";

// Competition rules: at most 159 characters, counted as Unicode code
// points, and not only white space. Enforce it here so a bad edit fails
// loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 159) {
  throw new Error(`entry must be 1-159 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
