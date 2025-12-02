import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let dial = 50;
  let count = 0;
  for (const line of input.split("\n")) {
    if (line[0] === "L") {
      dial -= parseInt(line.slice(1));
    } else {
      dial += parseInt(line.slice(1));
    }

    dial = ((dial % 100) + 100) % 100;

    if (dial == 0) {
      count += 1;
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let dial = 50;
  let count = 0;
  for (const line of input.split("\n")) {
    const range = Number(line.slice(1));
    for (let i = 0; i < range; i++ ){
      line[0] == 'L' ? dial-- : dial++
      if (dial < 0){
        dial += 100
      } else if(dial > 99){
        dial -= 100
      }
      if (dial == 0){
        count +=1
      }
    }
  }
  return count;
};

  run({
    part1: {
      tests: [
        {
          input:`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
          expected: 3,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input:`L68 
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
          expected: 6,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    // onlyTests: true,
  });
