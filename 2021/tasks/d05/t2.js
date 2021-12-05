const path = require("path");
const { ruler, max, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 20196, 12, ]
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
  // const hvOnly = input;
  // console.log(hvOnly);
  const points = input.reduce((points, line) => {
    let [[x1, y1], [x2, y2]] = line;
    // console.log("Line", line);
    const w = x2 - x1, h = y2 - y1;
    // console.log({w, h});
    const sizeMax = max(Math.abs(w), Math.abs(h));
    const dx = w === 0 ? 0 : (w < 0 ? -1 : 1);
    const dy = h === 0 ? 0 : (h < 0 ? -1 : 1);
    for (let i = 0; i <= sizeMax; i++) {
      const point = `${x1},${y1}`;
      // console.log(point);
      points[point] = points[point] ? points[point] + 1 : 1;
      x1 += dx;
      y1 += dy;
    }
    return points;
  }, {});
  // console.log(points);
  return Object.values(points).filter(v => v > 1).length;
}

function friendlyInput(input) {
  return input;
}
