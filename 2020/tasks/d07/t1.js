const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { findContainers } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 4, 0, 213, ]
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
  const containers = findAllOutermost("shiny gold", input);
  if (containers.length < 10)
    console.log(">>>>", containers);
  console.log(">>>>", containers.length);
  return (new Set(containers)).size ;
}

function findAllOutermost(needle, superSet, accum = []) {
  const containers = findContainers(needle, superSet);
  if (containers.length === 0) {
    // console.log("OUTERMOST", needle);
    // accum.push(needle);
    return accum;
  }
  containers.forEach(container => {
    accum.push(container);
    accum = findAllOutermost(container, superSet, accum);
  });
  return accum;
}

function friendlyInput(input) {
  return input.length > 10
    ? '...'
    : input.map(entry => [entry[0], entry[1].map(contents => contents.join(" "))]);
}
