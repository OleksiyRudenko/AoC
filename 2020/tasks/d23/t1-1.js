const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { list2array } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ '67384529', '52864379', ]
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

  const list = input.reduce((acc, v, i, a) => {
    const next = a[ i+1 === a.length ? 0 : i+1 ];
    acc[v] = next;
    return acc;
  }, []);

  console.log(input);
  console.log(list);
  console.log(list2array(list));
  console.log(ruler('-'));

  let cv = input[0], dv, listLength = list.length;
  for (let i = 0; i < 100; i++ ) {
    console.log(i+1, list2array(list));
    // extract triplet
    let triplet = [];
    for (let j = 0; j < 3; j++) {
      triplet[j] = list[cv];
      list[cv] = list[triplet[j]];
    }
    console.log('>triplet:', triplet);
    console.log('-triplet:', list2array(list, triplet));

    // find destination
    dv = cv;
    do {
      if (--dv === 0) dv = listLength-1;
    } while (triplet.includes(dv));

    list[triplet[2]] = list[dv];
    list[dv] = triplet[0];

    console.log('reinserted:', list2array(list));

    cv = list[cv];
  }

  return list2array(list).slice(1).join('');
}

function friendlyInput(input) {
  return input;
}
