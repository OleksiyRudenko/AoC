const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { bracketCost, bracketPairs, opening, closing,} = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 469755, 26397, ]
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
  // get illegal brackets
  const illegalBrackets = input.map(([...brackets]) => {
    const stack = [];
    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i];
      if (opening.includes(bracket)) {
        stack.push(bracketPairs[bracket]);
      }
      if (closing.includes(bracket)) {
        const expected = stack.pop();
        if (expected !== bracket) {
          return bracket;
        }
      }
    }
    return '';
  });

  console.log(illegalBrackets);

  return illegalBrackets.map(br => bracketCost[br])
    .reduce((sum, n) => sum+n, 0);

}

function friendlyInput(input) {
  return input;
}
