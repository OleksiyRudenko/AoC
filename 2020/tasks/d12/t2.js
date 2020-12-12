const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { iterateFerry } = require("./helper2");
console.log(path.basename(__filename));

const testSet = [ 286, 26841, ]
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
  const [ferryPosition,] = input
    .reduce(([ferry, wp], command) =>
        iterateFerry([ferry, wp], command),
      [[0, 0, 'E'], [10, 1]]) ;
  return Math.abs(ferryPosition[0])
    + Math.abs(ferryPosition[1]);
}

function friendlyInput(input) {
  return input;
}
