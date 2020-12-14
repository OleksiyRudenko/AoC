const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { dec2bin, applyMask, bin2dec } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 165, 10885823581193, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  const mem = [];
  let mask = '';
  input.forEach(e => {
    if (e[0] === 'mask') {
      mask = e[1];
    } else {
      let binV = dec2bin(e[1]);
      binV = applyMask(binV, mask);
      console.log(e[0], binV);
      mem[e[0]] = binV ;
    }
  });
  console.log(mem);
  const sum = mem.reduce((sum, e) =>
    sum + bin2dec(e),
    0);

  return sum;
}

function friendlyInput(input) {
  return input;
}
