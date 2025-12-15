import run from "aocrunner";

interface Range {
  start: number;
  end: number;
}

const parseRanges = (rawRanges: string): Range[] => {
  return rawRanges.split("\n").map((line) => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });
};

const parseInput = (rawInput: string) => rawInput.split("\n\n");

const part1 = (rawInput: string) => {
  const [rangesRaw, idsRaw] = parseInput(rawInput);
  const ranges = parseRanges(rangesRaw);
  const ids = idsRaw.split("\n").map(Number);

  let count = 0;

  for (const id of ids) {
    if (ranges.some((r) => id >= r.start && id <= r.end)) {
      count++;
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const [rangesRaw] = parseInput(rawInput);
  const ranges = parseRanges(rangesRaw);

  ranges.sort((a, b) => a.start - b.start);

  let sum = 0;
  let prevEnd = -1;

  for (const range of ranges) {
    if (range.end <= prevEnd) {
      continue;
    }

    if (range.start <= prevEnd) {
      sum += range.end - prevEnd;
    } else {
      sum += range.end - range.start + 1;
    }

    prevEnd = range.end;
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `3-5
10-14
16-20
12-18

1
5
8
11
17
32`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3-5
10-14
16-20
12-18

1
5
8
11
17
32`,
        expected: 14,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
