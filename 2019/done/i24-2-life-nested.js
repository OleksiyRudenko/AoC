const testSuite = require("../common/test-suite");
const T = require("../common/tools");

let testSet = testSuite.xform(xform, [
  {
    input: `....#
#..#.
#..##
..#..
#....`,
    expected: 1922, // 1922 after 200 iterations, 99 after 10 iterations
  },
  {
    input: `#....
.#.##
#...#
#.#..
..##.`,
    expected: 2023, // after 200 iterations
  },
]);

const pow2 = pos => Math.pow(2, pos);

const lastAnswer = testSuite.run(main, testSet, friendlyInput, 2);

console.log("ANSWER 24-2", lastAnswer);

function main(vectorized) {
  console.log('INPUT');
  console.log(T.matrix2lines(mxize(vectorized)));
  let dishes = [buildEmptyVector(), buildEmptyVector(), [...vectorized], buildEmptyVector(), buildEmptyVector()],
    newDishes;

  const neighRefs = buildNeighbouringRefs();

  let i;
  for (i = 0; i < 200; i++) {
    dishes = expandWithEmptyEntries(dishes);

    if (i === 10) {
      const bugsCount = dishes.flat().reduce(T.sum, 0);
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>> (#, entries, bugsCount)', i, dishes.length - 4, bugsCount);
      dishes.forEach((dish, idx) => {
        const bugCount = dish.flat().reduce(T.sum, 0);
        if (idx > 1 && idx < dishes.length - 2) {
          console.log('------------------------- dish #', idx, 'bugCount', bugCount);
          console.log(T.matrix2lines(mxize(dish)));
        }
      });
    }

    newDishes = [];
    const lastIdx = dishes.length - 2;
    for (let idx = 1; idx <= lastIdx; idx++) {
      newDishes.push(dishTick(dishes, idx, neighRefs));
    }
    dishes = newDishes;
  }

  const bugsCount = dishes.flat().reduce(T.sum, 0);
  console.log('========================> (#, entries, bugsCount)', i, dishes.length, bugsCount);
  dishes.forEach((dish, idx) => {
    const bugCount = dish.flat().reduce(T.sum, 0);
    console.log('------------------------- dish #', idx, 'bugCount', bugCount);
    console.log(T.matrix2lines(mxize(dish)));
  });

  return bugsCount;
}

function dishTick(dishes, idx, neighRefs) {
  let newDish = [];
  const dish = dishes[idx];

  for (let p = 0; p < 25; p++) {
    let newv = 0;
    if (p !== 12) { // ignore cell #12
      const cellv = dish[p];
      const neighsCount = neighRefs[p].map(([lvl, nm]) => dishes[idx + lvl][nm]) // neighs values
        .reduce(T.sum, 0);
      newv = cellv
        ? (neighsCount === 1 ? 1 : 0)
        : (neighsCount === 1 || neighsCount === 2 ? 1 : 0);
    }
    newDish.push(newv);
  }
  return newDish;
}

function mx2int(mx) {
  const  f = mx.flat();
  return f.reduce((sum, v, idx) => sum + v * Math.pow(2, idx), 0);
}

function buildNeighbouringRefs() {
  const refs = [];
  const semiRefs = {
    level0: [
      [1,5], // 0
      [0,2,6], [1,3,7], [2,4,8], [3,9],
      [0,6,10], // 5
      [1,5,7,11], [2,6,8], [3,7,9,13], [4,8,14],
      [5,11,15], // 10
      [6,10,16], [], [8,14,18], [9,13,19],
      [10,16,20], // 15
      [11,15,17,21], [16,18,22], [13,17,19,23], [14,18,24],
      [15,21], // 20
      [16,20,22], [17,21,23], [18,22,24], [19,23],
    ],
    level1p: [ // inner cells are affected by cells 1 level deeper
      [], [], [], [], [], // 0..4
      [], [], [0,1,2,3,4], [], [], // 5..9
      [], [0,5,10,15,20], [], [4,9,14,19,24], [], // 10..14
      [], [], [20,21,22,23,24], [], [], // 15..19
      [], [], [], [], [], // 20..24
    ],
    level1m: [ // outer cells are affected by cells 1 level up
      [7,11], [7], [7], [7], [7,13], // 0..4
      [11], [], [], [], [13], // 5..9
      [11], [], [], [], [13], // 10..14
      [11], [], [], [], [13], // 15..19
      [11,17], [17], [17], [17], [17, 13], // 20..24
    ],
  };
  for (let p = 0; p < 25; p++) {
    const neighs = [];
    neighs.push(semiRefs.level0[p].map(i => [0, i]));
    neighs.push(semiRefs.level1p[p].map(i => [1, i]));
    neighs.push(semiRefs.level1m[p].map(i => [-1, i]));
    refs.push(neighs.flat(1));
  }
  return refs;
}

function expandWithEmptyEntries(vectors) {
  let prepend = 0, append = 0;
  if (mx2int(vectors[1])) prepend = 1;
  if (mx2int(vectors[0])) prepend = 2;
  if (mx2int(vectors[vectors.length - 2])) append = 1;
  if (mx2int(vectors[vectors.length - 1])) append = 2;
  while (prepend--) vectors.unshift(buildEmptyVector());
  while (append--) vectors.push(buildEmptyVector());
  return vectors;
}

function buildEmptyVector(size = 25) {
  return new Array(size).fill(0);
}

function mxize(row) {
  row = [...row];
  const mx = [];
  while (row.length) {
    mx.push(row.splice(0,5).map(e => e ? '#' : '.'));
  }
  return mx;
}

function xform(input) {
  return input.split("\n")
    .map(s=>s.split('').map(c => c === '#' ? 1 : 0)).flat();
}

function friendlyInput(input) {
  return input.join('').slice(0,32);
}
