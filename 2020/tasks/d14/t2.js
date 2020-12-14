const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { dec2bin, applyMask, bin2dec, getAddresses } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ "n/a", 3816594901962, 208 ]
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
  const mem = {};
  let mask = '';
  input.forEach(e => {
    if (e[0] === 'mask') {
      mask = e[1];
    } else {
      getAddresses(e[0], mask).forEach(address => {
        //console.log('===', address);
        mem[address] = +e[1] ;
      });
    }
  });
  // console.log(mem);
  const sum = Object.values(mem).reduce((sum, e) =>
    sum + e,
    0);

  return sum;
}

function friendlyInput(input) {
  return input.slice(0, 10);
}
