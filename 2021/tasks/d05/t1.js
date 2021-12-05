const path = require("path");
const { ruler, max, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 6267, 5, ]
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
  const hvOnly = input.filter(line => line[0][0] === line[1][0] || line[0][1] === line[1][1]);
  // console.log(hvOnly);
  const points = hvOnly.reduce((points,line) => {
    const [[x1,y1], [x2,y2]] = line;
    // console.log("Line", line);
    let w = x2-x1, h = y2-y1;
    const sizeMax = max(Math.abs(w), Math.abs(h));
    const dx = w / (sizeMax);
    const dy = h / (sizeMax);
    // w += w<0 ? -1 : 1;
    // h += h<0 ? -1 : 1;
    for (let i = 0; i <= sizeMax; i++) {
      const point = `${Math.floor(x1+dx*i)},${Math.floor(y1+dy*i)}`;
      // console.log(point);
      points[point] = points[point] ? points[point]+1 : 1;
    }
    return points;
  }, {});
  // console.log(points);
  return Object.values(points).filter(v => v > 1).length;
}

function friendlyInput(input) {
  return input;
}
