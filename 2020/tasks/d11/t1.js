const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { runTick, getChecksum, countOccupiedAll } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 37, 2126, ]
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
  let checksum = getChecksum(mx);
  let step = 0;
  while (true) {
    let newMx = runTick(mx);
    console.log(step++);
    let newChecksum = getChecksum(newMx);
    if (newChecksum === checksum)  return countOccupiedAll(newMx);
    checksum = newChecksum;
    mx = newMx;
  }
}

function friendlyInput(input) {
  return matrix2lines(input);
}
