const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 291, 36246, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  const decks = [[...input[0]], [...input[1]]];
  const winner = play(decks, 1);
  const windeck = decks[winner];
  console.log('>>>>>>>>>>>>', windeck);
  const score = checksum(windeck);

  return score;
}

function play(decks, round) {
  const debug = false;
  console.log("ROUND", round) ;
  debug && console.log('>>>>>>>>>>>>', decks);
  let rounds = 1 ;
  let checksums = [];
  while (decks[0].length && decks[1].length) {
    let winner;
    const newchecksum = checksum(decks[0]) + '-' + checksum(decks[1]);
    if (checksums.includes(newchecksum)) {
      console.log('======================= BINGO! ==================');
      return 0;
    }
    checksums.push(newchecksum);

    const c = [decks[0].shift(), decks[1].shift()];

    if (c[0] <= decks[0].length && c[1] <= decks[1].length) {
      const subDecks = [decks[0].slice(0, c[0]), decks[1].slice(0, c[1])];
      debug && console.log(">> DIVE from", round, "having drewn", c);
      winner = play(subDecks,
        round*10 + rounds++);
      debug && console.log("<< BACK to", round);
    } else {
      winner = c[0] > c[1] ? 0 : 1;
    }
    decks[winner].push(c[winner]);
    decks[winner].push(c[(winner+1) % 2]);
    debug && console.log(c, '=>', decks);
  }
  return decks[0].length === 0 ? 1 : 0;
}

function checksum(deck) {
  return [...deck].reverse().reduce((sum, e, i) => sum + e * (i+1), 0);
}

function psum(deck) {
  return deck.join(',');
}

function friendlyInput(input) {
  return input;
}
