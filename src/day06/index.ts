import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.trim().split(/\s+/));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;

  for (let j = 0; j < input[0].length; j++) {
    let krat = input[input.length - 1][j] == "*";
    let currsum = krat ? 1 : 0;
    for (let i = 0; i < input.length - 1; i++) {
      if (krat) {
        currsum *= Number(input[i][j]);
      } else {
        currsum += Number(input[i][j]);
      }
    }
    sum += currsum;
  }
  return sum;
};

const part2 = (rawInput: string) => {
  let input = rawInput.split("\n");
  let sum = 0;
  let nums = [];

  outerlopp: for (let i = input[0].length - 1; i >= 0; i--) {
    let currnum = "";
    for (let j = 0; j < input.length; j++) {
      if (Number(input[j][i])) {
        currnum += input[j][i];
      } else if (input[j][i] == "*") {
        nums.push(Number(currnum));
        sum += nums.reduce((a, b) => a * b, 1);
        nums = [];
        continue outerlopp;
      } else if (input[j][i] == "+") {
        nums.push(Number(currnum));
        sum += nums.reduce((a, b) => a + b, 0);
        nums = [];
        continue outerlopp;
      }
    }
    if (currnum != "") {
      nums.push(Number(currnum));
    }
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   + `,
        expected: 4277556,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   + `,
        expected: 3263827,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
