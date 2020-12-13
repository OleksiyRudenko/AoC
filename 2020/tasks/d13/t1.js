const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 295, 3246, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input)  {
  const [ts, services] = input;
  const earliestBus =
    services.map(bus => [bus, bus - ts % bus])
    .reduce(([bus, eta], [nextBus, nextEta]) => {
      if (nextEta < eta) {
        bus = nextBus;
        eta = nextEta;
      }
      return [bus, eta];
    });
  return earliestBus[0] * earliestBus[1];
}

function friendlyInput(input) {
  return input;
}
