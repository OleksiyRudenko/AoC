const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { bracketPairs, opening, closing,} = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 2762335572, 288957, ]
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
  const bracketCost = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  };
  const points = input.map(([...brackets]) => {
    const stack = [];
    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i];
      if (opening.includes(bracket)) {
        stack.push(bracketPairs[bracket]);
      }
      if (closing.includes(bracket)) {
        const expected = stack.pop();
        if (expected !== bracket) {
          return 0;
        }
      }
    }
    return stack.reverse().map(br => bracketCost[br])
      .reduce((sum, n) => sum*5+n, 0);
  }).filter(Boolean);

  console.log(points);

  points.sort((a,b) => a-b);

  console.log(points);
  return points[Math.floor(points.length / 2)]

}

function friendlyInput(input) {
  return input;
}
