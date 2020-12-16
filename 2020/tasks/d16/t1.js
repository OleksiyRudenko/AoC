const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { extractInvalidValues } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 71, 19060, 0, ]
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
  const invalids = input.ntickets
    .map(ticket => extractInvalidValues(ticket, input.conditions));
  console.log(invalids) ;
  return invalids
    .flat()
    .reduce((sum, v) => sum + v, 0);
}

function friendlyInput({conditions, ticket, ntickets}) {
  return {
    conditions,
    ticket,
    ntickets: ntickets.slice(0, 10),
  };
}
