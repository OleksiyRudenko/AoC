const testSuite = require("../common/test-suite");
const mainInput = require("../done/i22--input");

console.log('22-2 PENDING for the lack of background');
/*
Community solutions:
  https://www.reddit.com/r/adventofcode/comments/ee0rqi/2019_day_22_solutions/
Tutorials:
  https://www.reddit.com/r/adventofcode/comments/eepz2i/2019_day_22_part_2_clean_annotated_solution_in_c/
  https://www.reddit.com/r/adventofcode/comments/eeizke/2019_day_22_everyday_were_shuffling/
    (for shuffle optimizations see also ./i22--input-optimized.js)
*/
let testSet = testSuite.xform(xform, [
  {
    input: mainInput,
    expected: 0,
  },
]);

const functions = {
  'cut': cut,
  'deal into new stack': dealIntoNewStack,
  'deal with increment': dealWithIncrement,
};

const lastAnswer = testSuite.run(main, testSet, friendlyInput, 1);

console.log("ANSWER 22-2:", lastAnswer);

function main(input) {
  // atomicTests();

  const deckSize = 119315717514047,
    repetitions = 101741582076661,
    targetCardPosition = 2020;

  const deckLen = input.length > 20 ? 10007 : 10;
  let deck = makeDeck(deckLen);
  // console.log('COMMANDS', input);

  input.forEach(command => {
    deck = functions[command[0]](deck, command[1]);
  });

  console.log('========================================');

  return deckLen > 10 ? deck[2020] : deck.join(' ');
}

function atomicTests() {
  let deck;
  console.log('=== ATOMIC TESTS ===');

  deck = makeDeck(10);
  console.log('DEAL     >', dealIntoNewStack(deck).join(' '));
  console.log('EXPECTED >', '9 8 7 6 5 4 3 2 1 0');

  deck = makeDeck(10);
  console.log('CUT 3    >', cut(deck, 3).join(' '));
  console.log('EXPECTED >', '3 4 5 6 7 8 9 0 1 2');

  deck = makeDeck(10);
  console.log('CUT -4   >', cut(deck, -4).join(' '));
  console.log('EXPECTED >', '6 7 8 9 0 1 2 3 4 5');

  deck = makeDeck(10);
  console.log('DEAL INC 3 >', dealWithIncrement(deck, 3).join(' '));
  console.log('EXPECTED   >', '0 7 4 1 8 5 2 9 6 3');

  console.log('=============');
}

function makeDeck(n) {
  return Object.keys(new Array(n).fill(null)).map(Number);
}

function dealIntoNewStack(deck) { // reverse
  return deck.reverse();
}

function cut(deck, n) {
  if (n > 0) {
    const subDeck = deck.splice(0, n);
    deck.push(...subDeck);
  } else {
    const subDeck = deck.splice(n, -n);
    deck.unshift(...subDeck);
  }
  return deck;
}

function dealWithIncrement(deck, n) {
  const deckL = deck.length;
  const newDeck = new Array(deckL);
  let ptr = 0;

  deck.forEach(e => {
    newDeck[ptr] = e;
    ptr = (ptr + n) % deckL;
  });

  return newDeck;
}

// https://www.reddit.com/r/adventofcode/comments/eeeixy/remember_the_challenges_arent_here_for_you_to/
// https://www.reddit.com/r/adventofcode/comments/ee56wh/2019_day_22_part_2_so_whats_the_purpose_of_this/fbqctrr/?utm_source=share&utm_medium=web2x

const cutCard = (cardPosition, inc, cardsCount) => (cardPosition - inc) % cardsCount;
const dealCard = (cardPosition, cardsCount) => (-1 - cardPosition) % cardsCount;
const dealCardStep = (cardPosition, step, cardsCount) =>  cardPosition * step % cardsCount;

const cutCardReverse = (newCardPosition, inc, cardsCount) => (newCardPosition + inc) % cardsCount;
const dealCardReverse = (newCardPosition, cardsCount) => (-1 - newCardPosition) % cardsCount;
const dealCardStepReverse = (newCardPosition, step, cardsCount) => {

  /*
    Modulo mult: (cardPosition * step) % cardsCount = a
    (cardPosition * step) = x
    x % m = a

    m is prime in our case.

    Modulo mult inverse: find x having a, oldCardPosition then equals x / step

    a x mod m = 1

    Find x using https://en.wikipedia.org/wiki/Fermat%27s_little_theorem



   */

  return powerModulo(newCardPosition, cardsCount - 2, cardsCount) / step;
};

const powerModulo = (x, y, m) => {
  if (y === 0) return 1;
  const p = powerModulo(x, y/2, m) % m;
  const p2 = (p * p) % m;
  return (y % 2 === 0) ? p2 : (x * p2) % m;
};


function xform(input) {
  const rows = input.split("\n");
  const commands = [];

  rows.forEach(row => {
    const substrs = row.split(" ");
    let fnNameSubstrsCount = substrs.length;
    let argument = Number(substrs[fnNameSubstrsCount - 1]);
    if (!isNaN(argument)) {
      substrs.splice(-1, 1);
    }
    commands.push([substrs.join(' '), argument]);
  });
  return commands;
}

function friendlyInput(input) {
  return input.join('; ').slice(0,132) + '...';
}
