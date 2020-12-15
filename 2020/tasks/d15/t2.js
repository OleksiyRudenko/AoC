const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 175594, 2578, 3544142,
  261214, 6895259, 18, 362,
  62714, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [7], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

// need to redesign as the sequence becomes periodic at some point

function main(input) {
  const s = [];
  for (let i = 0; i < input.length - 1; i++) {
    console.log(i, input[i]);
    s[input[i]] = i;
  }
  let lastN = input[input.length - 1];
  console.log(input.length - 1, lastN);

  for (let i = input.length; i < 30000000; i++) {
    // if (i < 10) console.log('>>>', lastN, '[x]', i);
    if (i % 10000 === 0) console.log(i);
    if (s[lastN] !== undefined) {
      const t = lastN;
      lastN = i - 1 - s[lastN];
      s[t] = i - 1 ;
      // if (i < 10) console.log('UPD', t, s[t], '>>', lastN);
    } else {
      // if (i < 10) console.log('NEW', lastN);
      s[lastN] = i - 1;
      lastN = 0;
    }
    // if (i < 10) console.log('NEXT', lastN, '[x]', i);
  }

  return lastN;
}

/*
  0 0
  1 3
  2 6
  3 0   <= 6 is new
  4 3   <= [3]=0 - [0]=0
  5 3   <= [4]=3 - [1]=3
  6 1   <= [5]=3 - [4]=3
  7 0   <= 1 is new
  8 4   <= [7]=0 - [3]=0
  9 0   <= 4 is new
 */

function friendlyInput(input) {
  return input;
}
