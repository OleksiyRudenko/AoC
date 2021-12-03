const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 198, 1071734, ]
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
  let gamma = 0, epsilon = 0;
  const rows = input.length, cols = input[0].length;
  for (let i = 0; i < cols; i++) {
    let bit = 0, count = 0;
    for (let j = 0; j < rows; j++) {
      count += input[j][i];
    }
    if (count > rows/2) bit = 1;
    gamma = gamma * 2 + bit;
    epsilon = epsilon * 2 + !bit;
  }
  // console.log([gamma, epsilon]);

  return gamma * epsilon;
}

function friendlyInput(input) {
  return input;
}
