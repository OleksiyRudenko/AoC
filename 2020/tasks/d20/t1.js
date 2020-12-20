const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { purgeArray, isPairEq } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 20899048083289, 84116744709593, ]
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
  console.log("3079:") ;
  console.log(input[3079]);
  let keys = Object.keys(input);
  for (let i = 0; i < keys.length - 1; i++) {
    const currborders = input[keys[i]];
    // if (!i)
    console.log('B:', currborders);
    for (let j = i+1; j < keys.length; j++) {
      const nextborders = input[keys[j]];
      for (let k = 0; k < 4; k++) {
        for (let l = 0; l < 4; l++) {
          if (isPairEq(currborders[k], nextborders[l])) {
            delete(currborders[k]);
            delete(nextborders[l]);
          }
        }
      }
    }
  }
  console.log("FILTERED OUT");
  console.log(input);

  const cornerTiles = [];
  keys.forEach(key => {
    if (purgeArray(input[key]).length === 2) {
      cornerTiles.push(+key);
    }
  });




  return cornerTiles.reduce((m, e) => m*e, 1);
}

function friendlyInput(input) {
  return input;
}

/*
  '1171': [ [ 966, 399 ], [  24,  96 ], [ 902, 391 ], [ 288,  18 ] ],
  '1427': [ [ 948, 183 ], [ 210, 300 ], [ 576,   9 ], [ 234, 348 ] ],
  '1489': [ [ 848,  43 ], [ 948, 183 ], [ 565, 689 ], [  18, 288 ] ],
  '1951': [ [ 710, 397 ], [ 564, 177 ], [ 841, 587 ], [ 498, 318 ] ],
  '2311': [ [ 210, 300 ], [ 231, 924 ], [ 498, 318 ], [  89, 616 ] ],
  '2473': [ [ 542, 481 ], [ 234, 348 ], [ 966, 399 ], [ 116, 184 ] ],
  '2729': [ [  85, 680 ], [ 710, 397 ], [ 271, 962 ], [ 576,   9 ] ],
  '2971': [ [ 161, 532 ], [  85, 680 ], [ 456,  78 ], [ 565, 689 ] ],
  '3079': [ [ 702, 501 ], [ 184, 116 ], [ 616,  89 ], [ 264,  66 ] ]

 */
