const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { distill, getSeatId } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 357, 567, 119, 820, 974]
  .map((expected, i) => ({
    input: INPUT[i],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, 'all', friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  const seatIds = input.map(seat =>
    [
      distill(seat.slice(0, 7), 'F', 'B'),
      distill(seat.slice(-3), 'L', 'R'),
    ]).map(([row, column]) => getSeatId(row, column));
  const seatId = seatIds.reduce((max, id) => {
    console.log(id);
    return id > max ? id : max
  }, 0);
  console.log(seatId);
  return seatId;
}

function friendlyInput(input) {
  return input;
}
