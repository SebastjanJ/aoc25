import run from "aocrunner";

const add = (map: Map<number, number>, key: number, val: number) => {
  map.set(key, (map.get(key) ?? 0) + val);
};

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let beams = new Set<number>();
  beams.add(input[0].indexOf("S"));
  let count = 0;

  for (let i = 1; i < input.length; i++) {
    for (const beam of [...beams]) {
      if (input[i][beam] === "^") {
        count += 1;
        beams.delete(beam);
        beams.add(beam - 1);
        beams.add(beam + 1);
      }
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let beams = new Map<number, number>();
  beams.set(input[0].indexOf("S"), 1);

  for (let i = 1; i < input.length; i++) {
    for (const [index, count] of [...beams]) {
      if (input[i][index] == "^") {
        beams.delete(index);
        add(beams, index - 1, count);
        add(beams, index + 1, count);
      }
    }
  }

  let sum = 0;
  beams.forEach((value) => (sum += value));
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`,
        expected: 40,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
