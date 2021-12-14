const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
// const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 2967, 1588, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [0], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer) ;
console.log(ruler());

function main({pt, rules}) {
  console.log("==>", pt.join(''));
  for (let i = 0; i < 10; i++) { // 5 for example (1), 10 for real(0) on task 1
    console.log(i+1, pt.join(''));
    pt = pt.map((l, idx, a) => [
      l,
      idx === a.length - 1 ? undefined : rules[l + a[idx+1]],
    ]).flat().filter(Boolean);
  }
  const counts = pt.reduce((counts, l) => {
    if (counts[l]) counts[l]++; else counts[l]=1;
    return counts;
  }, {});
  console.log(counts);
  const countx = Object.entries(counts).sort((a, b) => a[1] - b[1]);
  console.log(countx);


  return countx[countx.length-1][1] - countx[0][1];
}

function friendlyInput(input) {
  return input; //.map(row => row.join('')).join("\n");
}
