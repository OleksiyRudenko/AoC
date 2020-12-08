const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { Comp } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 5, 1810, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, 'last', friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler()) ;

function main(input) {
  const comp = new Comp (input);
  return comp.run();
}

function friendlyInput(input) {
  return input;
}
