const len2digit = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
};

/*
 standard word: word length, intersection rules

  "cf": 1,
  "acf": 7,
  "bcdf": 4,

  "acdfg": 3, // includes cdf from 4 (then also acf from 7)
  "abdfg": 5, // includes bdf from 4 (then also af from 7)
  "acdeg": 2, // includes cd from 4 (then also ac from 7)

  "abcdfg": 9, // includes bcdf from 4 (then also acf from 7)
  "abcefg": 0, // includes bcf from 4 (then also acf from 7)
  "abdefg": 6, // includes bdf from 4 (then also af from 7)

  "abcdefg": 8,

 */

// rules per word length
const digitDetectionRules = {
  2: [[1]], // if word.length === 2 it is word for 1; no need to calc any intersections
  3: [[7]],
  4: [[4]],
  5: [  // if word.length === 5
    [3, 3, 3, ],
    [5, 3, 2, ], // it is word for 5 if shares 3 letters with word[4] and 2 letters with word[7]
    [2, 2, 2, ],
  ],
  6: [
    [9, 4, 3, ],
    [0, 3, 3, ],
    [6, 3, 2, ],
  ],
  7: [[8]],
  };

module.exports = { len2digit, digitDetectionRules };
