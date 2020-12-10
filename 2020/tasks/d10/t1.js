const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 220, 0, 0, ]
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
  const counters =
    input.reduce((acc, n) => {
      // console.log(n, acc);
      acc.counts[n - acc.prev]++;
      acc.prev = n;
      return acc;
    }, {
      prev: 0,
      counts: [0,0,0,0],
    });
  counters.counts[3]++;
  console.log(counters);
  return counters.counts[1] * counters.counts[3];
}

function friendlyInput(input) {
  return input;
}
