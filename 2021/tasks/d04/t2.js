const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { find, makeDrawBoards, insert, } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 1924, 0, ]
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
  const dim = boards[0].length;
  const drawBoards = makeDrawBoards(boards.length, dim);
  let lastWinners = [], lastWinnerBi = null, lastWinnerNeedle = null;

  let needle = null, winnerBoards = [];

  let exclusions = [];

  for (let i = 0; i < draws.length; i++) {
    needle = draws[i];
    const findings = find(needle, boards);
    winnerBoards = [];
    if (findings.length) winnerBoards = insert(findings[0].n, findings, drawBoards, dim);
    if (winnerBoards.length > 0) {
      console.log("------------------\n", "Draw #", i, "needle", needle, "at", winnerBoards);
      console.log("Win with", needle, "at board", winnerBoards);

      /* if (lastWinners.length === 0) {
        console.log("Boards", boards[winnerBoard]);
        console.log("Findings", findings);
        console.log("DrawBoard", drawBoards[winnerBoard]);
        // drawBoards.forEach(db => console.log(db));
      } */

      // clone copy
      lastWinners = winnerBoards.map(bi => boards[bi].map(r => r.map(v => v)));
      lastWinnerBi = [...winnerBoards];
      lastWinnerNeedle = needle;
      exclusions.push(winnerBoards);

      const boardCount = boards.reduce((count, board) => count + (board === null ? 0 : 1), 0);
      console.log("Current boards", boardCount, "of", boards.length);
      winnerBoards.forEach(bi => { boards[bi] = null });
      const tboardCount = boards.reduce((count, board) => count + (board === null ? 0 : 1), 0);
      console.log("Remaining boards", tboardCount, "of", boards.length);

      /* if (winnerBoard !== null) {
        console.log("Excluded\n", lastWinner);
        console.log("as represented among boards\n", boards[winnerBoard]);
      } */

      if (boardCount === 1) break;

      // if (winnerBoard !== null) break;
    }
  }

  // needle, winnerboard
  /* boards = boards.filter(board => board !== null);
  winnerBoard = 0; */
  console.log(ruler());
  console.log("Exclusions\n", exclusions.flat(2).sort((a,b) => a-b));
  const boardCount = boards.reduce((count, board) => count + (board === null ? 0 : 1), 0);
  // if (winnerBoard === null) winnerBoard = lastWinner;
  console.log("WINNER", lastWinnerNeedle, "at", lastWinnerBi, "of remaining", boardCount);
  console.log("Boards\n", lastWinners);
  // console.log("Drawings\n", drawBoards[lastWinnerBi]);
  // console.log("Drawings\n", drawBoards[lastWinnerBi]);

  // ! what if we have more than 1 last winner?!
  const undrawnSum = lastWinners[lastWinners.length - 1].flat(2)// boards[winnerBoard].flat(2)
    .filter(n => n > -1)
    .reduce((s, n) => s + n, 0);
  console.log("Undrawn\n", undrawnSum);

  return undrawnSum * lastWinnerNeedle;
}

function friendlyInput(input) {
  return input.boards;
}
