const path = require("path");
const { ruler,  } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 92881128, 168, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1, 0], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  let fuel, p0, p50, p100, fuels;

  const getMid = (b, e) => Math.min(b, e) + Math.round((e - b) / 2);
  const getFuel = (input, target) =>
    input.reduce((sum, d) => sum + sum1n(Math.abs(d - target)), 0);

  p0 = Math.min(...input);
  p100 = Math.max(...input);

  do {
    p50 = getMid(p0, p100);
    console.log(p0, p50, p100);
    fuels = [getFuel(input, p0), getFuel(input, p50), getFuel(input, p100)];
    console.log(fuels);
    if (fuels[0] < fuels[2]) {
      p100 = p50;
    } else {
      p0 = p50;
    }
  } while(Math.abs(p0 - p100) !== 1);
  console.log(ruler('-'));
  console.log("TARGET", p50);
  fuel = getFuel(input, p50);
  return fuel;
}

function sum1n(n) { return (n * (n+1)) / 2; }

function friendlyInput(input) {
  return input;
}
