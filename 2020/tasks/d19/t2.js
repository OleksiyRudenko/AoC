const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
// const {  } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 0, 367, 12, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main({rules, test}) {
  // ! 374 : 42+; 42+ 31+
  // !! 285 : 42+; 42+ 31
  // console.log(rules);

  /*
     8: 42         > 8: 42 | 42 8 => (42)+?
     11: 42 31     > 11: 42 31 | 42 11 31 => 42+? 31

     31: 33 69 | 117 41
     42: 18 33 | 45 117
   */

  console.log("0", rules[0]);
  console.log("8", rules[8]);
  console.log("11", rules[11]);

  /* rules[0] = [
    42, "+?",
    // "(?:", 42, "(?=", 42, "*(\\1?+", 31, ")))+\\1",
    // "(?:", 42, "(?=", 42, "*(?<G>\\k<G>?+", 31, ")))+\\k<G>"
    // "(?<G>", 42, ")+(?<-G>", 31, ")+(?(G)(?!))"
    // "(?<G>", 42, ")+(\\k<G>", 31, ")+(?(\\k<G>)(?!))"
    "(", 42, "+", 31, "+)",
  ]; */

  rules [0] = [
    "(?<X42>", 42, "+)",
    "(?<X31>", 31, "+)",
  ];

  console.log("0", rules[0]);

  rules.forEach((r, i) => {
    if (r.includes('|')) {
      rules[i].unshift("(?:");
      rules[i].push(")");
    }
    // rules[i] = r.map(t => typeof t === 'string' ? t : rules[t])
    r.forEach((t, j) => {
      if (typeof t !== 'string')
        rules[i][j] = rules[t];
    });
  });

  /* rules[8].push("+");

  rules[11].splice(1, 0, "+");
  rules[11].push("+"); */


  /*
  rules[42].push("+?");
  rules[42].unshift("(?<X>");
  rules[42].push(")");

  rules[31].push("+?");
  rules[31].unshift("(?<Y>");
  rules[31].push(")"); */


  console.log("");
  console.log("8", rules[8].flat(100).join(''), "\n");
  console.log("11", rules[11].flat(100).join(''), "\n");
  console.log("42 >>", rules[42].flat(100).join(''), "\n");
  console.log("31 >>", rules[31].flat(100).join(''), "\n");

  const regexps = rules[0].flat(100).join('');
  console.log('R', regexps);
  const re = new RegExp("^" + regexps + "$");

  let res = test
    .map(t => t.match(re))
    .filter(t => t !== null);

  res.forEach(m => {
    console.log('!', m.groups.X42, m.groups.X31);
  });

  // there is always more of 42 than of 31
  res = res
    .filter(m => m.groups.X42.length > m.groups.X31.length);

  return res
    .length;
}

function friendlyInput({rules, test}) {
  return {
    rules: rules.slice(0, 3),
    test: test.slice(0, 3),
  };
}
