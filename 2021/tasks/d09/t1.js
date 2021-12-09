const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 448, 15, ]
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
  const ic = input[0].length;

  const landRow = Array(ic + 2).fill(9);
  const mx = [landRow, ...input.map(row => [9, ...row, 9]), landRow];
  const mxr = mx.length, mxc = mx[0].length;

  const collection = [];
  for (let r = 1; r < mxr-1; r++) {
    for (let c = 1; c < mxc-1; c++) {
      const valid = isLowestPoint(mx, r, c);
      if (valid !== undefined) collection.push(valid);
    }
  }
  console.log(collection);

  return collection.reduce((sum, n) => sum + n + 1, 0);
}

function isLowestPoint(mx, r, c) {
  const curr = mx[r][c];
  if (curr >= mx[r-1][c]) return;
  if (curr >= mx[r+1][c]) return;
  if (curr >= mx[r][c-1]) return;
  if (curr >= mx[r][c+1]) return;
  return curr;
}

function friendlyInput(input) {
  return input.map(row => row.join(''));
}
