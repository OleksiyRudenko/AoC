const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 356190, 5934, ]
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
  let school = [6], schools = [];
  // 1 fish cycle starting at 6
  for (let day = 0; day < 86; day++) {
    school = tick(school);
    schools.push(school);
  }
  // console.log("schools\n", schools.slice(0, 50).map(school => school.join(", ")).join("\n"));
  // console.log("Lens\n", schools.slice(0, 50).map(school => school.length).join(", "));
  console.log(schools.length);

  return input
    .map(fishAge => schools[5 - fishAge + 80].length)
    .reduce((sum, n) => sum + n, 0);
}

function tick(school) {
  return school.map(fish => fish === 0 ? [6, 8] : fish - 1).flat();
}

function friendlyInput(input) {
  return input;
}
