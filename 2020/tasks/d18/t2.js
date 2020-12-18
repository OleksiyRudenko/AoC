const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { evaluate2 } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 46, 1445, 669060, 23340, 141993988282687, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [4], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  let sum = input.reduce((sum, expression) => {
    const value = evaluate2(expression);
    return sum + value ;
  }, 0)
  return sum;
}

function friendlyInput(input) {
  return input;
}
