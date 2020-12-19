const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
// const {  } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 2, 173, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main({rules, test}) {
  // console.log(rules);
  rules.forEach((r, i) => {
    if (r.includes('|')) {
      rules[i].unshift("(");
      rules[i].push(")");
    }
    // rules[i] = r.map(t => typeof t === 'string' ? t : rules[t])
    r.forEach((t, j) => {
      if (typeof t !== 'string')
        rules[i][j] = rules[t];
    });
  });

  const regexps = rules[0].flat(100).join('');
  // console.log('R', regexps);
  const re = new RegExp("^" + regexps + "$");

  return test
    .map(t => t.match(re))
    .filter(t => t !== null)
    .length ;
}

function friendlyInput(input) {
  return input;
}
