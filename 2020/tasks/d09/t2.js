const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { isNotCompaundable, findCompoundsRange } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 62, 104800569, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, 'last', friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  const { preamble, sequence } = input;
  for (let i = preamble; i < sequence.length; i++) {
    const outlier = isNotCompaundable(
      sequence[i], sequence.slice(i - preamble, i)
    );
    if (outlier !== false) {
      console.log('NEEDLE', outlier);
      const range = findCompoundsRange(outlier, sequence);
      const {min, max} =
        range.reduce((acc, n) => {
           if (n<acc.min) acc.min = n;
           if (n>acc.max) acc.max = n;
           return acc;
          }
          ,
          {
          min: range[0],
          max: range[0],
        });
      console.log('RANGE', range.length, range);
      return min + max;
    }
  }
  return null;
}

function friendlyInput(input) {
  return {
    preamble: input.preamble,
    sequence: input.sequence.slice(0, 26)
  };
}
