const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { len2digit } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 355, 26, ]
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
  const outputs = input
    .map(({output}) => output)
    .flat()
  console.log(outputs.length, outputs);

  const count1478 = outputs
    .reduce((counter, output) => {
      const l = output.length;
      const digit = len2digit[l];
      if (digit !== undefined) {
        // console.log(output, l, digit);
        counter[digit] = counter[digit] ? counter[digit] + 1 : 1;
      }
      return counter;
      }, {});

  console.log(count1478);

  return Object.values(count1478)
    .reduce((sum, c) => sum + c, 0);

  // return 0;
}

function friendlyInput(input) {
  return input.map(({input, output}) => ({
    input: input.map(word => word.join("")),
    output: output.map(word => word.join("")),
  }));
}
