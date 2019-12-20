const testSuite = require("../common/test-suite");
const VM = require("../common/vm");

let testSet = testSuite.xform(xform, [
  {
    input: ``,
    expected: 0,
  },
]);

const lastAnswer = testSuite.run(main, testSet, friendlyInput, 1);

console.log("ANSWER X-1", lastAnswer);

function main(input) {
  const vm = new VM("R", input, [], true);
  const res = vm.run([]);

  return res;
}

function xform(input) {
  return input.split("\n").map(Number);
}

function friendlyInput(input) {
  return input.join('').slice(0,32);
}
