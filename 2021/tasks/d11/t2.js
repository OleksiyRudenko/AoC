const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 515, 195, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [0], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  const rc = input.length, cc = input[0].length;
  const flashCount = [0];

  for (let step = 0; step < 1000; step++) {
    if (!step) console.log(friendlyInput(input));
    console.log("========= step", step, "fc", flashCount[0])
    for (let r = 0; r < rc; r++) {
      for (let c = 0; c < cc; c++) {
        input[r][c]++;
      }
    }

    for (let r = 0; r < rc; r++) {
      for (let c = 0; c < cc; c++) {
        if (input[r][c] === 10) flash(input, r, c, flashCount);
      }
    }
    for (let r = 0; r < rc; r++) {
      for (let c = 0; c < cc; c++) {
        if (input[r][c] === -1) input[r][c] = 0;
      }
    }
    if (step<3 || step === 99) console.log(friendlyInput(input));
    if (input.reduce((sum, row) => sum + row.reduce((s, n) => s+n,0), 0) === 0) {
      return step+1;
    }
  }
  return undefined;
}

function flash(mx, r, c, flashCount) {
  const rc = mx.length, cc = mx[0].length;
  flashCount[0]++;
  mx[r][c] = -1;
  // get neighbors
  const neighbors = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ].map(([dr, dc]) => [r+dr, c+dc])
    .filter(([r, c]) => r>=0 && r<rc && c>=0 && c<cc);

  neighbors.forEach(([nr, nc]) => {
    if (mx[nr][nc] > -1 && mx[nr][nc] < 10) {
      if (++mx[nr][nc] === 10) flash(mx,nr,nc,flashCount);
    }
  });
}

function friendlyInput(input) {
  return input.map(row => row.join('')).join("\n");
}
