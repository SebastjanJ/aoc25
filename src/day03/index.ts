import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  input.forEach((battery) => {
    let maxi = 0;
    for (let i = 1; i < battery.length - 1; i++) {
      if (battery[i] > battery[maxi]) {
        maxi = i;
        if (battery[maxi] == "9") {
          break;
        }
      }
    }

    let maxj = maxi + 1;
    for (let j = maxi + 2; j < battery.length; j++) {
      if (battery[j] > battery[maxj]) {
        maxj = j;
        if (battery[maxj] == "9") {
          break;
        }
      }
    }
    sum += Number(battery[maxi] + battery[maxj]);
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  input.forEach((battery) => {
    let maxnumber = "";
    let curr = 0;
    for (let i = 11; i >= 0; i--) {
      for (let j = curr; j < battery.length - i; j++) {
        if (battery[j] > battery[curr]) {
          curr = j;
          if (battery[curr] == "9") {
            break;
          }
        }
      }
      maxnumber += battery[curr];
      curr += 1;
    }
    sum += Number(maxnumber);
  });

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 357,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 3121910778619,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
