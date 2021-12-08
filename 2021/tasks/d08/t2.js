const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { digitDetectionRules } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 983030, 61229, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [0], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler()) ;

function main(input) {
  // we expect letters in each word ordered
  const nums = input.map(({wiringsSet, readings}) => {
    const dictionary = makeDictionary(wiringsSet, digitDetectionRules);
    const digits = readings.map(word => dictionary.indexOf(word));
    return +digits.join("");
  });
  return nums.reduce((sum, n) => sum + n, 0);
}

/**
 * Creates a map of words for each decimal digit
 * @param wiringsSet - inbound words
 * @param rules - digit identification rule sets
 * @returns {[]} - [digit] = word-for-a-digit
 */
function makeDictionary(wiringsSet, rules) {
  // Put words in order by word length.
  // This way words for 4 and 7 will be figured out by the time they are needed
  // to identify words for other digits that depend on them
  wiringsSet.sort((a, b) => a.length - b.length);
  return wiringsSet.reduce((dictionary, word) => {
    rules[word.length].forEach(([digit, intersectionWith4, intersectionWith7]) => {
      if (intersectionWith4 === undefined) {
        // make decision purely on word length for 1, 4, 7, 8
        dictionary[digit] = word;
      } else {
        const is4 = getIntersectionLength(word, dictionary[4]);
        const is7 = getIntersectionLength(word, dictionary[7]);
        if (is4 === intersectionWith4 && is7 === intersectionWith7) {
          dictionary[digit] = word;
        }
      }
    });
    return dictionary;
  }, Array(10));
}

function getIntersectionLength(word1, word2) {
  return [...word2].filter(letter => word1.includes(letter)).length;
}

function friendlyInput(input) {
  return input.slice(0, 20);
}
