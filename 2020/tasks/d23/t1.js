const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
// const { helper } = require("./helper");
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
  let ci = 0, curr = input[ci], di;
  const inputLength = input.length;
  for (let i = 0; i < 100; i++) {
    console.log(i+1, input);
    console.log(`Curr [${ci}] == `, curr);

    let pick = input.splice(ci+1, 3);
    if (pick.length < 3) {
      ci -= 3 - pick.length;
      pick = [...pick, ...input.splice(0, 3 - pick.length)];
    }

    console.log(pick);
    console.log(input);

    let dest = curr;
    do {
      dest--;
      if (dest === 0) dest = 9;
      di = input.findIndex(n => n === dest);
    } while (di === -1);

    console.log(`Dest [${di}] == `, dest);

    if (ci>=di) ci = (ci + 3) % inputLength;
    input.splice(di+1,0,...pick);

    console.log(' >> ', input, `$[ci] == `, input[ci]);
    if (++ci === input.length) ci = 0;
    curr = input[ci];
    console.log(' ');
  }

  const i1 = input.findIndex(n => n === 1);
  const result =
    [...input.slice(i1+1),
      ...input.slice(0, i1)].join('');


  return result;
}

function friendlyInput(input) {
  return input;
}
