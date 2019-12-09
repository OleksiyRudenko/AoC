// 411 players; last marble is worth 72059 points

const playersCount = 411, maxMarbleValue = 72059 * 100;

const marbles = [0];
let currentPosition = 0;
let currentPlayer = 0;
let highScores = new Array(playersCount).fill(0, 0, playersCount);

/*
for (let marbleValue = 1; marbleValue <= maxMarbleValue; marbleValue++) {
  if (marbleValue % 23 === 0) {
    highScores[currentPlayer] += marbleValue;
    currentPosition -= 7;
    if (currentPosition < 0) currentPosition = marbles.length + currentPosition;
    highScores[currentPlayer] += marbles.splice(currentPosition, 1)[0];
    if (currentPosition === marbles.length) currentPosition = 0;
  } else {
    currentPosition = currentPosition === marbles.length - 1 ? 1 : currentPosition + 2;
    marbles.splice(currentPosition, 0, marbleValue);
  }
  if (++currentPlayer === playersCount) currentPlayer = 0;
}
*/
console.log(highScores.reduce((max, v) => v > max ? v : max));
