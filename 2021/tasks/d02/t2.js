const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 1840311528, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [0], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  console.log(input);
  let aim = 0;
  let x = 0, y = 0;
  for (const [dir, v] of input) {
    if (dir) {
      aim += v;
    } else {
      x += v;
      y += aim * v;
    }
  }
  return x * y;
}

function friendlyInput(input) {
  return input;
}
