const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
// const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 3692219987038, 2188189693529, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [0], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer) ;
console.log(ruler());

function main({pt, rules}) {
  console.log("==>", pt.join(''));
  const pairCounts0 = Object.fromEntries(Object.entries(rules).map(([pair, _]) => [pair, 0]));
  console.log("000", pairCounts0);

  let pairCounts = {...pairCounts0};
  pt.forEach((l, i, a) => {
    if (i < pt.length - 1) {
      pairCounts[l + a[i+1]]++;
    }
  });

  console.log("ccc", pairCounts);

  for (let i = 0; i < 40; i++) {
    const pairCountsNext = {...pairCounts0};
    Object.entries(rules).forEach(([[a,b], target]) => {
      pairCountsNext[a+target] += pairCounts[a+b];
      pairCountsNext[target+b] += pairCounts[a+b];
    });
    pairCounts = pairCountsNext;
  }

  const charSet = [...new Set(Object
    .entries(rules)
    .map(([pair, target]) => [pair[0], pair[1], target])
    .flat())].sort();
  console.log("charset", charSet);

  const charCount = Object.fromEntries(charSet.map(char => [char, 0]));
  charCount[pt[0]] = 1;

  Object.entries(pairCounts).forEach(([[a,b], v]) => {
    charCount[b] += v;
  });
  console.log("CharCount", charCount);

  const countx = Object.values(charCount).sort((a, b) => a-b);
  console.log(countx);

  return countx[countx.length-1] - countx[0];
}

function friendlyInput(input) {
  return input; //.map(row => row.join('')).join("\n");
}
