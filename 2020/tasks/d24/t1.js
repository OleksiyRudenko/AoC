const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 1, 10, 512, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [2], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  const floor = {};
  input.forEach(path => {
    const tile = path.reduce((coords, step) => {
      coords = go(coords, step);
      return coords;
    }, [0, 0]);
    const location = tile.join(",");
    if (floor[location]) {
      console.log("-", location);
      delete floor[location];
    } else {
      console.log("+", location);
      floor[location] = 1;
    }
  });

  return Object.keys(floor).length;
}

function go([x, y], step) {
  const t = [x, y];
  switch (step) {
    case 'e':
      x++;
      break;
    case 'se':
      y++;
      x += odd(y) ? 1 : 0;
      break;
    case 'ne':
      y--;
      x += odd(y) ? 1 : 0;
      break;
    case 'w':
      x--;
      break;
    case 'sw':
      y++;
      x += odd(y) ? 0 : -1;
      break;
    case 'nw':
      y--;
      x += odd(y) ? 0 : -1;
      break;
  }
  // console.log('*', t, step, [x, y]);
  return [x, y];
}

function odd(v) {
  return Math.abs(v) % 2;
}

function friendlyInput(input) {
  return input[0];
}
