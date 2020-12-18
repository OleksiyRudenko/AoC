const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { evaluate } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 26, 437, 12240, 13632, 53660285675207, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [4], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler()) ;

function main(input) {
  let sum = input.reduce((sum, expression) => {
    const value = evaluate(expression);
    return sum + value;
  }, 0)
  return sum;
}

function friendlyInput(input) {
  return input;
}
