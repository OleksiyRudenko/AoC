const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
console.log(path.basename(__filename));

const testSet = [
  { input: INPUT[0], expected: 2 },
  { input: INPUT[1], expected: 204 },
];
console.log(ruler());
const lastAnswer = runTests(main, testSet, 'all', friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid',];
  console.log(input.length );
  return input.reduce((countValid, passport) => {
    for (let i = 0; i < requiredFields.length; i++) {
      if (!passport.includes(requiredFields[i])) {
        console.log("Passport", passport, "doesn't contain", requiredFields[i]);
        return countValid;
      }
    }
    console.log(countValid);
    return ++countValid;
  }, 0);
}

function friendlyInput(input) {
  return input;
}
