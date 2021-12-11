const bracketCost = {
  '':  0,
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const bracketPairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const opening = Object.keys(bracketPairs);
const closing = Object.values(bracketPairs);

module.exports = { bracketCost, bracketPairs, opening, closing, };
