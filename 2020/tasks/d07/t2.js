const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { findContents } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 32, 126, 38426, ]
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
  const count = countContent("shiny gold", input);
  console.log(">>>>>>>>>>>>", count);
  return count;
}

function countContent(needle, superSet, accum = 0) {
  const contents = findContents(needle, superSet);
  console.log(needle, contents);
  let subAccum = 0;
  contents.forEach(([count, color]) => {
    // subAccum+= count;
    const inc = countContent(color, superSet, 0) + 1;
    // console.log('ADD to', needle, ': ', color, ' = 1 + inc * count =', `1 + ${inc} * ${count}`, 1 + inc * count);
    subAccum += inc * count;
  });
  return accum + subAccum;
}

function friendlyInput(input) {
  return input;
}
