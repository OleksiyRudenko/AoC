const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { find, makeDrawBoards, insert, } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 4512, 41668, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main({draws, boards}) {
  const drawBoards = makeDrawBoards(boards.length, boards[0].length);

  let needle = null, winnerBoard = null;
  for (let i = 0; i < draws.length; i++) {
    needle = draws[i];
    const findings = find(needle, boards);
    if (!i) {
      console.log("------------------\n", i, needle);
      console.log("Findings:", findings);
      console.log("Boards", boards);
    }
    winnerBoard = insert(findings[0].n, findings, drawBoards, boards[0].length);
    if (!i || winnerBoard !== null) {
      console.log("Win with", needle, "at board", winnerBoard);
      console.log("DrawBoards");
      drawBoards.forEach(db => console.log(db));
      if (winnerBoard !== null) break;
    }
  }

  // needle, winnerboard
  console.log("WINNER", needle, "at", winnerBoard);
  console.log("Board\n", boards[winnerBoard]);
  console.log("Drawings\n", drawBoards[winnerBoard]);

  const undrawnSum = boards[winnerBoard].flat(2)
    .filter(n => n > -1)
    .reduce((s, n) => s+n, 0);
  console.log("Undrawn\n", undrawnSum);

  return undrawnSum * needle;
}

function friendlyInput(input) {
  return input.boards;
}
