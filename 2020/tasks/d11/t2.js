const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { runTick2, getChecksum, countOccupiedAll,hasOccupied, getOccupied2 } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 26, 1914, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(mx)  {
  // test();
  // return 0;

  let checksum = getChecksum(mx);
  let step = 0;
  while (true) {
    let newMx = runTick2(mx);
    console.log(step++) ;
    // console.log(matrix2lines(newMx));
    let newChecksum = getChecksum(newMx);
    if (newChecksum === checksum)  return countOccupiedAll(newMx);
    checksum = newChecksum;
    mx = newMx;
  }
}

function test() {
  let mx;
  mx = `.............
.L...#.#.#.#.
.............`
    .split("\n").map(r => r.split(''));

  console.log('Has Occupied', hasOccupied(mx, 1, 1, 0, 1));
  console.log('Occupied #', getOccupied2(mx, 1, 1));

}

function friendlyInput(input) {
  return matrix2lines(input);
}
