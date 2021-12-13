const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
// const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 810, 17, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());


const fold = {
  x: function(dots, atx, [rows, cols]) {
    dots = dots.map(([x, y]) =>
      [
        x >= atx ? atx - (x - atx) : x,
        y,
      ]);
    return [...new Set(dots.map(pair => pair.join(",")))]
      .map(pair => pair.split(",").map(n=>+n))
  },

  y: function(dots, aty, [rows, cols]) {
    dots = dots.map(([x, y]) =>
      [
        x,
        y >= aty ? aty - (y - aty) : y,
      ]);
    return [...new Set(dots.map(pair => pair.join(",")))]
      .map(pair => pair.split(",").map(n=>+n))
  },

};

const lastAnswer = runTests(main, testSet, [0], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main({dots, cmd}) {
  const [maxx, maxy] = dots.reduce(
    ([maxx, maxy], [x,y]) =>
      [x > maxx ? x : maxx, y > maxy ? y : maxy],
    [0,0]);
  let [rows, cols] = [maxy+1, maxx+1];
  const mx = makeMatrix(rows, cols, '.');

  dots.forEach(([c, r]) => mx[r][c] = '#' );

  console.log("ORIGINAL");
  console.log("rows, cols", [rows, cols]);
  console.log(dots);
  console.log(matrix2lines(mx));

  cmd = [cmd[0]];

  cmd.forEach(({axis, v}) => {
    dots = fold[axis](dots, v, [rows, cols]);
    [rows, cols] = [axis === 'y' ? v : rows, axis === 'x' ? v : cols];
    console.log("----- FOLD", axis, v);
    console.log("rows, cols", [rows, cols]);
    console.log(dots);
    console.log(matrix2lines(makeSheet(dots, rows, cols)));
  });

  return dots.length;
}

function makeSheet(dots, rows, cols) {
  const mx = makeMatrix(rows, cols, '.');
  dots.forEach(([c, r]) => mx[r][c] = '#' );
  return mx;
}

function friendlyInput({dots, cmd}) {
  return {
    dots: dots.map(pair => pair.join(",")),
    cmd: cmd.map(({axis, v}) => `${axis}=${v}`),
  };
}
