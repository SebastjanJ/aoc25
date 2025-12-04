import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

let cache = {
  inputHash: "",
  grid: [] as number[][],
  initialQueue: [] as [number, number][],
};

const initData = (rawInput: string) => {
  if (cache.inputHash === rawInput) {
    return cache;
  }

  const lines = parseInput(rawInput);
  const rows = lines.length;
  const cols = lines[0].length;

  const grid = Array.from({ length: rows }, () => Array(cols).fill(-1));
  const q: [number, number][] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (lines[r][c] === ".") continue;

      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          if (lines[r + dr]?.[c + dc] === "@") {
            count++;
          }
        }
      }

      grid[r][c] = count;

      if (count < 4) {
        q.push([r, c]);
      }
    }
  }

  cache = { inputHash: rawInput, grid, initialQueue: q };
  return cache;
};

const part1 = (rawInput: string) => {
  const { initialQueue } = initData(rawInput);
  return initialQueue.length;
};

const part2 = (rawInput: string) => {
  const { grid, initialQueue: q } = initData(rawInput);

  let count = 0;

  while (q.length > 0) {
    const [r, c] = q.shift()!;
    if (grid[r][c] === -1) continue;

    grid[r][c] = -1;
    count++;

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;

        const nr = r + dr;
        const nc = c + dc;

        if (grid[nr]?.[nc] !== undefined && grid[nr][nc] !== -1) {
          grid[nr][nc]--;

          if (grid[nr][nc] < 4) {
            q.push([nr, nc]);
          }
        }
      }
    }
  }

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
        expected: 43,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
