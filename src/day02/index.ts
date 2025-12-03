import run from "aocrunner";

interface Range {
  start: number;
  end: number;
}

const parseInput = (rawInput: string): Range[] =>
  rawInput.split(",").map((range) => {
    const [start, end] = range.split("-").map(Number);
    return { start, end };
  });

const part1 = (rawInput: string) => {
  const idRanges = parseInput(rawInput);
  let sum = 0;
  idRanges.forEach((range) => {
    for (let i = range.start; i <= range.end; i++) {
      const istr = i.toString();
      if (istr.slice(0, istr.length / 2) == istr.slice(istr.length / 2)) {
        sum += i;
      }
    }
  });
  return sum;
};

const part2 = (rawInput: string) => {
  const idRanges = parseInput(rawInput);
  let sum = 0;
  idRanges.forEach((range) => {
    for (let i = range.start; i <= range.end; i++) {
      const istr = i.toString();
      const len = istr.length;
      for (let j = 1; j <= len / 2; j++) {
        if (len % j !== 0) continue;
        if (istr.split(istr.slice(0, j)).join("") == "") {
          sum += i;
          break;
        }
      }
    }
  });
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
        expected: 1227775554,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
        expected: 4174379265,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
