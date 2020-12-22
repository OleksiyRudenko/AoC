const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 306, 35370, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler()) ;

function main(input) {
  const decks = [[...input[0]], [...input[1]]];
  while (decks[0].length && decks[1].length) {
    const c = [decks[0].shift(), decks[1].shift()];
    const winner = c[0] > c[1] ? 0 : 1;
    decks[winner].push(c[winner]);
    decks[winner].push(c[(winner+1) % 2]);
    console.log(c, '===', decks);
  }
  console.log('>>>>>>>>>>>>', decks);
  const windeck = decks[decks[0].length === 0 ? 1 : 0];
  windeck.reverse();
  console.log('>>>>>>>>>>>>', windeck);
  const score = windeck
    .reduce((sum, e, i) => sum + e * (i+1), 0);

  return score;
}

function friendlyInput(input) {
  return input;
}
