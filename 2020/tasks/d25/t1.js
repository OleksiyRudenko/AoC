const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [ 14897079, 12181021, ]
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
  console.log(makePublicKey(8, 7));      //    5764801
  console.log(makePublicKey(11, 7));     //   17807724
  console.log(makePublicKey(8, 17807724)); // 14897079

  const ls = input.map(pk => getLoopSize(pk));
  console.log(ls);
  const sk = makePublicKey(ls[0], input[1]);

  return sk;
}

function makePublicKey(loopSize, subject) {
  let res = 1;
  for (let i = 0; i < loopSize; i++) {
    res = (res * subject) % 20201227;
  }
  return res;
}

function getLoopSize(publicKey, subject = 7) {
  let res = 1, loopSize = 0;
  do {
    res = (res * subject) % 20201227;
    loopSize++;
  } while (res !== publicKey);
  return loopSize;

}


function friendlyInput(input) {
  return input;
}
