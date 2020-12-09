const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { isNotCompaundable } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 127, 776203571, ]
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
  const { preamble, sequence } = input;
  for (let i = preamble; i < sequence.length; i++) {
    const result = isNotCompaundable(
      sequence[i], sequence.slice(i - preamble, i)
    );
    if (result !== false) return result ;
  }
  return null;
}

function friendlyInput(input) {
  return {
    preamble: input.preamble,
    sequence: input.sequence.slice(0, 26)
  };
}
