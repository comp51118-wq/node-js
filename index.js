const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const TOTAL_FILES = 10;
const INPUT_DIR = join(__dirname, 'input');
const OUTPUT_PATH = join(__dirname, 'output.txt');

// Reads a file and returns its lines, ignoring a single trailing newline
function readLines(filePath) {
  return readFileSync(filePath, 'utf8')
    .replace(/\r?\n$/, '')
    .split(/\r?\n/);
}

// File number n contributes its first n lines (or fewer if the file is shorter)
const merged = Array.from({ length: TOTAL_FILES }, (_, i) => i + 1).flatMap(
  (n) => readLines(join(INPUT_DIR, `file${n}.txt`)).slice(0, n)
);

writeFileSync(OUTPUT_PATH, merged.join('\n') + '\n', 'utf8');
console.log(`Finished: ${merged.length} lines saved to ${OUTPUT_PATH}`);
