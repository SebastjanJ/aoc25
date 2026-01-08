import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let count = 0;

  for (const region of input[input.length - 1].split("\n")) {
    const [dimensions, indicesStr] = region.split(": ");
    const [x, y] = dimensions.split("x").map(Number);
    const sum =
      indicesStr
        .split(" ")
        .map(Number)
        .reduce((a, b) => a + b, 0) * 9;

    if (x * y >= sum) {
      count++;
    }

    // bin packing ... :)
  }
  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
