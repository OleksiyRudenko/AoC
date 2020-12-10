const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 19208, 3454189699072, ]
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
  const diffs = input
    .map((n, i, a) =>
      i
        ? n - a[i-1]
        : n
    );
  // console.log('DIFFS', diffs);
  const groupsOf1 =
    diffs.reduce((acc, n) => {
      if (n === 1) {
        if (acc.prev !== 1) {
          acc.groups.push(0);
        }
        acc.groups[acc.groups.length - 1]++;
      }
      acc.prev = n;
      return acc;
      },
      {
        prev: 0,
        groups: [],
      })['groups'];
  // console.log('GROUPS', groupsOf1);
  const significants = groupsOf1
    .map(e => e-1)
    .filter(e => e);
  // console.log('SIGNIFICANTS', significants);
  const variations = significants
    .map(n => {
      return [0, 2, 4, 7][n];
    });
  // console.log('variations', variations);

  const variationsX = variations
    .reduce((acc, n) => acc * n, 1);
  // console.log('variations X', variationsX);

  return variationsX;
}

function friendlyInput(input) {
  return [...input.slice(0, 10), '...'];
}

/*
 Branching model

 x11113
 ^  ^^^
 ^ ^ ^^
 ^ ^^^^
 ^^  ^^
 ^^ ^^^
 ^^^ ^^
 ^^^^^^

    ^^
   ^ ^
   ^^^
  ^  ^
  ^ ^^
  ^^ ^
  ^^^^

      ^^
     ^ ^
     ^^^
    ^  ^
    ^ ^^
    ^^ ^
    ^^^^
   ^  ^^
   ^^  ^
   ^^ ^^
   ^^^ ^
   ^^^^^
  ^  ^ ^
  ^  ^^^
  ^ ^  ^
  ^ ^ ^^
  ^^  ^^
  ^^ ^ ^
  ^^ ^^^
  ^^^  ^
  ^^^ ^^
  ^^^^ ^
  ^^^^^^


 */
