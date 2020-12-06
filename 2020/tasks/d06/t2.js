const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 6, 3202, ]
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
    group
      .split("\n")
      .map(a => a.split(''))
      .reduce((commons, one) =>
        commons
          .filter(answer => one.includes(answer)))
      .length
  ).reduce((acc, e) => acc+e);
}

function friendlyInput(input) {
  return input;
}
