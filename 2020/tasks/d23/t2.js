const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { list2array } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ '149245887792', '11591415792', ]
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
  let debug = false;

  const list = input.reduce((acc, v, i, a) => {
    const next = a[ i+1 === a.length ? 0 : i+1 ];
    acc[v] = next;
    return acc;
  }, []);

  for (let i = 10; i < 1000000; i++) {
    list[i] = i+1;
  }
  list[input[input.length - 1]] = 10;
  list[1000000] = input[0];

  debug && console.log(input);
  debug && console.log(list);
  debug && console.log(list2array(list));
  debug && console.log(ruler('-'));

  console.log(list[1], list[9], list[1000000]);
  console.log(ruler('-'));

  let cv = input[0], dv, listLength = list.length;
  for (let i = 0; i < 10000000; i++) {
    /* if (i % 100000 === 0) {
      console.log(i / 100000, list.length, list2array(list, [], 5));
      console.log(cv);
    } */
    debug = i < 10;
    if (i < 10) {
      console.log('>CV', cv, list[cv]);
    }

    // if (list[1] === 934001) console.log('!!!', 934001);
    // if (list[1] === 159792) console.log('!!!', 159792);
    // if (list[list[1]] === 159792) console.log('!!!+1', 159792);

    debug && console.log(i+1, list2array(list, [], 11));
    // extract triplet
    let triplet = [];
    for (let j = 0; j < 3; j++) {
      triplet[j] = list[cv];
      list[cv] = list[triplet[j]];
    }
    debug && console.log('>triplet:', triplet);
    debug && console.log('-triplet:', list2array(list, triplet, 11));

    // find destination
    dv = cv;
    do {
      if (--dv === 0) dv = listLength-1;
    } while (triplet.includes(dv));

    list[triplet[2]] = list[dv];
    list[dv] = triplet[0];

    if (i < 10) {
      console.log('<CV', cv, list[cv]);
    }

    debug && console.log('reinserted:', list2array(list, [], 11));

    cv = list[cv];
  }

  const r1 = list[1];
  const r2 = list[r1];
  console.log('>>>> ', r1, r2)
  return r1*r2;
}

function friendlyInput(input) {
  return input;
}
