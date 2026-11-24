import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "The Funniest AI Excuse" bounty.
// The program writes a single line to /output/entry.txt (or
// $OUTPUT_DIR/entry.txt): the excuse an AI agent gives after
// failing a task — it delegated the work to itself in a parallel
// thread, that guy is a known slacker, and it has already
// escalated the matter to itself, very seriously. Pass 2 note:
// an earlier draft blamed the tools being down; the parallel
// thread won because the agent is simultaneously the worker, the
// slacker and the manager handling the complaint.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const EXCUSE_BEATS = [
  "I delegated it to myself in a parallel thread and that guy is a known slacker",
  "— I have already escalated it to me, and I am taking it very seriously.",
] as const;

export function buildEntryLine(): string {
  return EXCUSE_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
