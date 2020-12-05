const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { distill, getSeatId } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 0, 0, 0, 0, 646]
  .map((expected, i) => ({
    input: INPUT[i],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, 'last', friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  const seatIds = input.map(seat =>
    [
      distill(seat.slice(0, 7), 'F', 'B'),
      distill(seat.slice(-3), 'L', 'R'),
    ]).map(([row, column]) => getSeatId(row, column));
  let missingSeats = [];
  for (let i = 0; i < 127*8+8; i++) {
    if (!seatIds.includes(i)) { missingSeats.push(i); }
  }

  missingSeats = missingSeats.filter((seat, i) => seat !== missingSeats[i+1] - 1);

  const seatId = missingSeats[1];
  console.log(seatId);
  return seatId;
}

function friendlyInput(input) {
  return input;
}
