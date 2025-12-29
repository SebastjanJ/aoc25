import run from "aocrunner";
// https://www.reddit.com/r/adventofcode/comments/1pvjito/2025_day_9_part_2_why_did_almost_nobody_solve_the/

type Point = [number, number];
type Edge = [number, number, number];

interface Area {
  p: number;
  i: number;
  j: number;
}

const parseInput = (rawInput: string): Point[] =>
  rawInput.split("\n").map((line) => line.split(",").map(Number) as Point);

const getAreasSorted = (input: Point[]): Area[] => {
  const areas: Area[] = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const [x1, y1] = input[i];
      const [x2, y2] = input[j];
      if (x1 === x2 || y1 === y2) continue;

      const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
      areas.push({ p: area, i, j });
    }
  }

  return areas.sort((a, b) => b.p - a.p);
};

const getEdges = (input: Point[]): { hEdges: Edge[]; vEdges: Edge[] } => {
  const hEdges: Edge[] = [];
  const vEdges: Edge[] = [];

  for (let i = 0; i < input.length; i++) {
    const [x1, y1] = input[i];
    const [x2, y2] = input[(i + 1) % input.length];

    if (y1 === y2) {
      hEdges.push([y1, Math.min(x1, x2), Math.max(x1, x2)]);
    } else {
      vEdges.push([x1, Math.min(y1, y2), Math.max(y1, y2)]);
    }
  }

  return { hEdges, vEdges };
};

const isInsidePolygon = (px: number, py: number, polygon: Point[]): boolean => {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
};

const isRectangleValid = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  hEdges: Edge[],
  vEdges: Edge[],
  polygon: Point[],
): boolean => {
  const xMin = Math.min(x1, x2);
  const xMax = Math.max(x1, x2);
  const yMin = Math.min(y1, y2);
  const yMax = Math.max(y1, y2);

  // Collect coordinates where edges intersect the rectangle
  const xCoords = new Set([xMin, xMax]);
  const yCoords = new Set([yMin, yMax]);

  for (const [y, exMin, exMax] of hEdges) {
    if (y >= yMin && y <= yMax && exMax > xMin && exMin < xMax) {
      yCoords.add(y);
      xCoords.add(Math.max(exMin, xMin));
      xCoords.add(Math.min(exMax, xMax));
    }
  }

  for (const [x, eyMin, eyMax] of vEdges) {
    if (x >= xMin && x <= xMax && eyMax > yMin && eyMin < yMax) {
      xCoords.add(x);
      yCoords.add(Math.max(eyMin, yMin));
      yCoords.add(Math.min(eyMax, yMax));
    }
  }

  const sortedX = [...xCoords].sort((a, b) => a - b);
  const sortedY = [...yCoords].sort((a, b) => a - b);

  for (let i = 0; i < sortedX.length - 1; i++) {
    for (let j = 0; j < sortedY.length - 1; j++) {
      const centerX = (sortedX[i] + sortedX[i + 1]) / 2;
      const centerY = (sortedY[j] + sortedY[j + 1]) / 2;

      if (!isInsidePolygon(centerX, centerY, polygon)) {
        return false;
      }
    }
  }

  return true;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getAreasSorted(input)[0].p;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const { hEdges, vEdges } = getEdges(input);
  const areas = getAreasSorted(input);

  for (const { p, i, j } of areas) {
    const [x1, y1] = input[i];
    const [x2, y2] = input[j];

    if (isRectangleValid(x1, y1, x2, y2, hEdges, vEdges, input)) {
      return p;
    }
  }

  return 0;
};

run({
  part1: {
    tests: [
      {
        input: `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`,
        expected: 50,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`,
        expected: 24,
      },
      {
        input: `25,0
25,2
28,2
28,4
31,4
31,6
34,6
34,8
36,8
36,10
32,10
32,8
29,8
29,6
26,6
26,4
23,4
23,2
21,2
21,5
15,5
15,2
13,2
13,4
10,4
10,6
7,6
7,8
4,8
4,10
0,10
0,8
2,8
2,6
5,6
5,4
8,4
8,2
11,2
11,0
17,0
17,3
19,3
19,0`,
        expected: 21,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
