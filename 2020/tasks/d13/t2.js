const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input2");
const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 3417, 754018, 779210,
  1261476, 1202161486, 1068781,
  1010182346291467, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [6], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input)  {
  const services = input.map((e, i) => [e, i]);
  const buses = services.filter(e => e[0] !== 'x');
  const primes = buses.map(e => e[0]);

  console.log('SERVICES', services);
  console.log('BUSES', buses);
  console.log('PRIMES', primes);

  let T = 0;
  let inc = 1; //buses[currentBusIndex][0];

  for (let i = 0; i < buses.length - 1; i++) {
    inc *= buses[i][0];
    do {
      T += inc;
    } while((T + buses[i+1][1]) % buses[i+1][0]);
    console.log('T', T, 'for', buses[i], buses[i+1]);
  }

  console.log('>>', T);


  return T;
}

/*
   17, x, 13, 19
   17x = T + 0
   13y = T + 2
   19z = T + 3
   17x = 13y - 2 = 19z - 3
 */

function friendlyInput(input) {
  return input.slice(0, 20);
}
