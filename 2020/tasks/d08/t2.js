const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { Comp2 } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 8, 969, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, 'last', friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer) ;
console.log(ruler());

function main(input) {
  const results = [];
  try {
    const comp = new Comp2(input, true);
    results.push(comp.run());
  } catch (e) {
    // noop
  }

  let fixedLines = [];
  for (let i = 0; i < input.length; i++) {
    const [command, value] = input[i];
    if (command === 'nop' && value || command === 'jmp') {
      const prg = input.map(e => [e[0], e[1]]);
      prg[i][0] = command === 'nop' ? 'jmp' : 'nop';
      try {
        const comp = new Comp2(prg, true);
        fixedLines.push(i);
        results.push(comp.run());
      } catch(e) {
        // noop
      }
    }
  }

  console.log('# of fixedLines', fixedLines.length);
  return results;
}

function friendlyInput(input) {
  return input.length < 15 ? input : input.slice(0, 15);
}
