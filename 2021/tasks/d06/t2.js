const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 1617359101538, 26984457539, ]
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
  return breed(input, 256);
}

function breed(fishSchool, days) {
  let fishCountByAge = fishSchool
    .reduce((counter, daysToSpawn) => (++counter[daysToSpawn], counter),
      Array(9).fill(0));
  let fishReadyToSpawnCount;

  while (days-- > 0) {
    [fishReadyToSpawnCount, ...fishCountByAge] = fishCountByAge; // extract spawners, decrement days to spawn
    fishCountByAge[6] += fishReadyToSpawnCount; // add spawners to fish of age 6
    fishCountByAge[8] = fishReadyToSpawnCount; // newborn fish count
  }
  return fishCountByAge.reduce((sum, v) => sum + v, 0);
}

function friendlyInput(input) {
  return input;
}
