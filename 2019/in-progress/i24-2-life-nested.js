const testSuite = require("../common/test-suite");
const T = require("../common/tools");

let testSet = testSuite.xform(xform, [
  {
    input: `....#
#..#.
#..##
..#..
#....`,
    expected: 2129920, // zero nesting though
  },
  {
    input: `#....
.#.##
#...#
#.#..
..##.`,
    expected: 0,
  },
]);

const pow2 = pos => Math.pow(2, pos);

const lastAnswer = testSuite.run(main, testSet, friendlyInput, 1);

console.log("ANSWER 24-2", lastAnswer);

function main(mx) {
  const layouts = [];
  const neighMasks = buildNeighbouringMasks();
  let bioPrint = mx2int(mx);

  while (!layouts.includes(bioPrint)) {
    console.log(bioPrint);
    layouts.push(bioPrint);
    bioPrint = dishTick(bioPrint, neighMasks);
  }

  console.log(bioPrint);

  return bioPrint;
}

function dishTick(dish, neighMasks) {
  let newDish = [];
  const cellMasks = buildCellMasks();
  for (let p = 0; p < 25; p++) {
    const cellv = dish & cellMasks[p];
    const neighsCount = neighMasks[p].map(([lvl, nm]) => dish & nm) // neighs values
      .reduce((cnt, v) => cnt + (v ? 1 : 0), 0);
    const newv = cellv
      ? (neighsCount === 1 ? 1 : 0)
      : (neighsCount === 1 || neighsCount === 2 ? 1 : 0);
    newDish.push(newv);
  }
  return newDish.reduce((sum, v, pos) => sum + cellMasks[pos] * v, 0);
}

function mx2int(mx) {
  const  f = mx.flat();
  return f.reduce((sum, v, idx) => sum + v * Math.pow(2, idx), 0);
}

function buildNeighbouringMasks() {
  const masks = [];
  for (let p = 0; p < 25; p++) {
    const neighs = [];

    // same level masks
    if (p > 4) neighs.push([0, p-5]); // upper
    if (p < 20) neighs.push([0, p+5]); // below
    if (p%5) neighs.push([0, p-1]); // to the left
    if ((p+1)%5) neighs.push([0, p+1]); // to the right

    // outer border masks

    // adjacent to inner cell masks



    // const neighMask = neighs.reduce((sum, pos) => sum + pow2(pos), 0);
    const neighMask = neighs.map(pos3d => [pos3d[0], pow2(pos3d[1])]);
    masks.push(neighMask);
  }
  return masks;
}

function buildCellMasks() {
  const masks = [];
  let mask = 1;
  for (let p = 0; p < 25; p++) {
    masks.push(mask);
    mask *= 2;
  }
  return masks;
}

function xform(input) {
  return input.split("\n")
    .map(s=>s.split('').map(c => c === '#' ? 1 : 0));
}

function friendlyInput(input) {
  return input.join('').slice(0,32);
}
