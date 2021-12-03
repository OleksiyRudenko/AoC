const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ [23, 10, 230], [1679, 3648, 6124992] ]
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
  // console.log("OXY", ruler());
  let oxygen = reduce(input, 1);
  // console.log("CO2", ruler());
  let co2 = reduce(input, 0);
  // console.log([oxygen, co2]);

  return [oxygen, co2, oxygen * co2];
}

function reduce(mx, target, bitIndex = 0) {
  // console.log(mx);
  const rows = mx.length;
  if (rows === 1) {
    return mx[0].reduce((bin, v) => bin * 2 + v, 0);
  }
  let countOnes = 0;
  for (let j = 0; j < rows; j++) {
    countOnes += mx[j][bitIndex];
  }
  const filterTarget = (countOnes >= rows/2) ? target : +!target;
  return reduce(
    mx.filter(row => row[bitIndex] === filterTarget),
    target,
    bitIndex + 1
  );
}

function friendlyInput(input) {
  return input;
}
