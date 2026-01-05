import run from "aocrunner";
import GLPK from "glpk.js/node";

const parseInput = (rawInput: string) => rawInput.split("\n");

const getButtonsAndCounters = (line: string) => {
  const buttonMatch = line.matchAll(/\(([\d,]+)\)/g);
  const pressMatch = line.match(/\{([\d,]+)\}/);

  const buttons: number[][] = [];
  for (const match of buttonMatch) {
    const positions = match[1].split(",").map(Number);
    buttons.push(positions);
  }

  const presses: number[] = [];
  if (pressMatch) {
    const pressPositions = pressMatch[1].split(",").map(Number);
    presses.push(...pressPositions);
  }

  return { buttons, presses };
};

const getLightAndButtonsBinary = (line: string) => {
  const lightMatch = line.match(/\[([.#]+)\]/);
  const buttonMatch = line.matchAll(/\(([\d,]+)\)/g);

  if (lightMatch) {
    const lightStr = lightMatch[1];
    let lightBits = 0;
    for (let i = 0; i < lightStr.length; i++) {
      if (lightStr[i] === "#") {
        lightBits |= 1 << i;
      }
    }

    const buttons: number[] = [];
    for (const match of buttonMatch) {
      const positions = match[1].split(",").map(Number);
      let buttonBits = 0;
      for (const pos of positions) {
        buttonBits |= 1 << pos;
      }
      buttons.push(buttonBits);
    }
    return { lightBits, buttons };
  }
  return null;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let count = 0;
  outer: for (const line of input) {
    let parsed = getLightAndButtonsBinary(line);
    if (!parsed) {
      continue;
    }
    const { lightBits, buttons } = parsed;

    const visited = new Set<number>();
    let queue: number[] = [lightBits];
    visited.add(lightBits);

    for (let level = 0; level < buttons.length; level++) {
      const nextQueue: number[] = [];

      for (const bits of queue) {
        for (const button of buttons) {
          const newBits = bits ^ button;

          if (newBits === 0) {
            count += level + 1;
            continue outer;
          } else if (!visited.has(newBits)) {
            visited.add(newBits);
            nextQueue.push(newBits);
          }
        }
      }

      queue = nextQueue;
    }
  }

  return count;
};

const part2 = async (rawInput: string) => {
  const input = parseInput(rawInput);
  let count = 0;
  const glpk = await GLPK();

  for (const line of input) {
    const { buttons, presses } = getButtonsAndCounters(line);
    const lp = {
      name: "buttons",
      objective: {
        direction: glpk.GLP_MIN,
        name: "total_presses",
        vars: buttons.map((_, i) => ({ name: `x${i}`, coef: 1 })),
      },
      subjectTo: presses.map((target, counterIdx) => ({
        name: `counter${counterIdx}`,
        vars: buttons
          .map((btn, btnIdx) =>
            btn.includes(counterIdx) ? { name: `x${btnIdx}`, coef: 1 } : null,
          )
          .filter((v) => v !== null),
        bnds: { type: glpk.GLP_FX, lb: target, ub: target },
      })),
      generals: buttons.map((_, i) => `x${i}`),
    };

    const options = {
      msglev: glpk.GLP_MSG_OFF,
    };

    const result = glpk.solve(lp, options);
    count += result.result.z;
  }

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`,
        expected: 33,
      },
    ],
    solution: part2 as unknown as (input: string) => number,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
