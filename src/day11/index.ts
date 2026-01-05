import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const map = new Map<string, string[]>();
  rawInput.split("\n").forEach((line) => {
    const [node, children] = line.split(": ");
    map.set(node, children.split(" "));
  });
  return map;
};

function dfs(map: Map<string, string[]>, node: string) {
  if (node === "out") {
    return 1;
  }
  let count = 0;
  for (const child of map.get(node) || []) {
    count += dfs(map, child);
  }
  return count;
}

function dfsWithMemo(
  map: Map<string, string[]>,
  node: string,
  hasDac: boolean,
  hasFft: boolean,
  memo: Map<string, number>,
): number {
  if (node === "out") {
    return Number(hasDac && hasFft);
  }

  const key = `${node}${hasDac}${hasFft}`;
  if (memo.has(key)) {
    return memo.get(key)!;
  }

  let count = 0;
  for (const child of map.get(node) || []) {
    count += dfsWithMemo(
      map,
      child,
      hasDac || child === "dac",
      hasFft || child === "fft",
      memo,
    );
  }

  memo.set(key, count);
  return count;
}

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);
  return dfs(map, "you");
};

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput);
  return dfsWithMemo(map, "svr", false, false, new Map());
};

run({
  part1: {
    tests: [
      {
        input: `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `svr: aaa bbb
aaa: fft 
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out
`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
