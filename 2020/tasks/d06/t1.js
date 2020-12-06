const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 11, 6633, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, 'all', friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  return input.map(group =>
    (new Set(
      group.replace(/\n/g, '').split('')
      ))
      .size
  ).reduce((acc, e) => acc+e);
}

function friendlyInput(input) {
  return input;
}
