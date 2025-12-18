import run from "aocrunner";

interface Distance {
  i: number;
  j: number;
  d: number;
}

class DSU {
  parent: number[];
  size: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a: number, b: number): number {
    a = this.find(a);
    b = this.find(b);
    if (a === b) return 0;
    if (this.size[a] < this.size[b]) [a, b] = [b, a];
    this.parent[b] = a;
    this.size[a] += this.size[b];
    return this.size[a];
  }
}

const parseInput = (rawInput: string): number[][] =>
  rawInput.split("\n").map((line) => line.split(",").map(Number));

const getDistances = (points: number[][]): Distance[] => {
  const distances: Distance[] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1, z1] = points[i];
      const [x2, y2, z2] = points[j];
      const dx = x1 - x2;
      const dy = y1 - y2;
      const dz = z1 - z2;
      distances.push({ i, j, d: dx * dx + dy * dy + dz * dz });
    }
  }
  return distances.sort((a: Distance, b: Distance) => a.d - b.d);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const distances = getDistances(input);
  let dsu = new DSU(input.length);

  for (let i = 0; i < Math.min(distances.length, 1000); i++) {
    dsu.union(distances[i].i, distances[i].j);
  }

  return dsu.size
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const distances = getDistances(input);
  let dsu = new DSU(input.length);
  const size = input.length;

  for (const d of distances) {
    if (dsu.union(d.i, d.j) == size) {
      return input[d.i][0] * input[d.j][0];
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`,
        expected: 40,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`,
        expected: 25272,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
