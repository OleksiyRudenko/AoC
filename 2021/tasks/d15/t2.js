const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
// const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 2948, 315, ] // failures:
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [0], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(mx) {

  const mx1r = mx.length, mx1c = mx[0].length;
  const mx5 = makeMatrix(mx1r * 5, mx1c * 5, 0);

  copyMxOver(mx5, 0, 0, mx, 0, 0, mx.length, mx[0].length, 0);

  for (let x = 1; x < 5; x++) {
    for (let y = 0; y < x+1; y++) {
      copyMxOver(mx5, mx1r * x, mx1c * y, mx, 0, 0, mx1r, mx1c, x+y);
      copyMxOver(mx5, mx1c * y, mx1r * x, mx, 0, 0, mx1r, mx1c, x+y);
    }
  }

  console.log("MX1");
  console.log(matrix2lines(mx));
  console.log("MX5");
  console.log(matrix2lines(mx5));

  // return 0;

  mx = mx5;

  const mxr = mx.length, mxc = mx[0].length;
  let minRisk = makeMatrix(mxr, mxc, 99999);

  let drones = [{
    r: 0, c: 0, risk: 0,
  }];
  let newDrones = [];

  // const steps = mxr - 1 + mxc - 1;
  let i = 0;
  do {// for (let i = 0; i < steps; i++) {
    // spawn
    drones.forEach(({r, c, risk}) => {
      if (c+1 < mxc) {
        newDrones.push({
          r: r, c: c+1, risk: risk + mx[r][c+1],
        });
      }
      if (r+1 < mxr) {
        newDrones.push({
          r: r+1, c: c, risk: risk + mx[r+1][c],
        });
      }
      if (c-1 >= 0) {
        newDrones.push({
          r: r, c: c-1, risk: risk + mx[r][c-1],
        });
      }
      if (r-1 >= 0) {
        newDrones.push({
          r: r-1, c: c, risk: risk + mx[r-1][c],
        });
      }

    });
    newDrones.sort((d1, d2) => d1.risk - d2.risk);
    newDrones = newDrones.filter(d => {
      if (d.risk < minRisk[d.r][d.c]) {
        minRisk[d.r][d.c] = d.risk;
        return true;
      } else {
        return false;
      }
    });
    drones = newDrones;
    console.log(++i, drones.map(({r,c,risk}) => `[${c},${r}]=${risk}`));
  } while(drones.length > 1);

  console.log(friendlyInput(mx, ""));
  console.log(friendlyInput(minRisk, ","));

  console.log("FINAL\n", drones.map(({r,c,risk}) => `[${c},${r}]=${risk}`));

  return drones[0].risk;
}

function copyMxOver(dest, toR, toC, source, fromR, fromC, rows, cols, increment) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let v = source[fromR+r][fromC+c] + increment;
      if (v > 9) v-=9;
      dest[toR+r][toC+c] = v;
    }
  }
}

function friendlyInput(input, delim='') {
  return input.map(row => row.join(delim)).join("\n");
}
