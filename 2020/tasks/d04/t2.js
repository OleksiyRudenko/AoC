const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input2");
console.log(path.basename(__filename));

const testSet = [
  { input: INPUT[0], expected: 4 }, // 4 invalid, then 4 valid
  { input: INPUT[1], expected: 179 },
];
console.log(ruler());
const lastAnswer = runTests(main, testSet, 0, friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  const fieldsValidation = {
    byr: {
      p: /^\d+$/,
      r: [1920, 2002],
    },
    iyr:{
      p: /^\d+$/,
      r: [2010, 2020],
    },
    eyr: {
      p: /^\d+$/,
      r: [2020, 2030],
    },
    hgt: {
      p: /^\d+in|cm$/,
      r: [[150, 193], [59, 76]],
    },
    hcl: {
      p: /^#[0-9a-f]{6}$/,
    },
    ecl: {
      p: /^amb|blu|brn|gry|grn|hzl|oth$/,
    }, pid: {
      p: /^[0-9]{9}$/,
    }
  };
  const requiredFields = Object.keys(fieldsValidation);
  console.log(input.length);
  return input.reduce((countValid, passport) => {
    console.log(ruler('*'));
    console.log(passport);
    const passportFields = Object.keys(passport);
    for (let i = 0; i < requiredFields.length; i++) {
      if (!passportFields.includes(requiredFields[i])) {
        console.log("ERROR! doesn't contain", requiredFields[i]);
        return countValid;
      }
      // validate field
      const field = requiredFields[i];
      const value = passport[field];
      const rules = fieldsValidation[field];
      const isHgt = field === 'hgt';
      // console.log(field, value, rules);
      if (!value.match(rules['p'])) {
        console.log("ERROR! ", field, value, rules);
        return countValid;
      }
      if (rules['r']) {
        const numericValue = parseInt(value);
        let range = rules['r'];
        if (isHgt) {
          const unit = value.slice(-2);
          range = rules['r'][unit === 'cm' ? 0 : 1];
        }
        if (numericValue < range[0] || numericValue > range[1]) return countValid;
      }
    }
    console.log("+++ VALID");
    return ++countValid;
  }, 0);
}

function friendlyInput(input) {
  return input;
}
