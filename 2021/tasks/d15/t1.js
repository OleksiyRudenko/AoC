const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
// const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 714, 40, ] // failures: 717>X 703<X
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
  let drones = [{
    r: 0, c: 0, risk: 0,
  }];
  let newDrones = [];
  const mxr = mx.length, mxc = mx[0].length;
  let minRisk = makeMatrix(mxr, mxc, 99999);
  const steps = mxr - 1 + mxc - 1;
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

function friendlyInput(input, delim='') {
  return input.map(row => row.join(delim)).join("\n");
}
