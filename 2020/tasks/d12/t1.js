const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { iterateFerry } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 25, 636, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  const ferryPosition = input
    .reduce((pos, command) =>
      iterateFerry(pos, command),
      [0, 0, 'E']) ;
  return Math.abs(ferryPosition[0])
    + Math.abs(ferryPosition[1]);
}

function friendlyInput(input) {
  return input;
}
