const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 2073315, ]
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
  const [x, y] = input.reduce((pos, [idx, val]) => {
    pos[idx] += val;
    return pos;
  },[0, 0]);
  return x * y;
}

function friendlyInput(input) {
  return input;
}
