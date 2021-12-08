const path = require("path");
const { ruler, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { len2digit, // digitDetectionRules
  } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 983030, 61229, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [0], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler()) ;

function main(input) {

  const nums = input.map(({input, output}, idx) => {
    // go through all rows convert into output decimals

    // stringify
    const inputs = input.map(word => glue(word));
    const outputs = output.map(word => glue(word));

    const dict1478 = find1478(inputs);
    const dict1478len = Object.keys(dict1478).length;
    if (dict1478len !== 4) {
      console.log(`Ooops! At row ${idx} sentence ${inputs}`,
        "doesn't contain 1478 but contains", Object.keys(dict1478).join(""));
    }
    // console.log(">> Dict 1478")

    // build map
    let map;

    // map = makeMap(inputs, digitDetectionRules, idx === 0);

    map = [
      undefined,
      dict1478['1'],
      undefined,
      undefined,
      dict1478['4'],
      undefined,
      undefined,
      dict1478['7'],
      dict1478['8'],
      undefined,
    ];
    map = completeMap(map, inputs, idx === 0);

    const digits = outputs.map(word => map.indexOf(word));

    !idx && console.log(digits, "<=", outputs) ;
    return +digits.join("");
  });


  return nums.reduce((sum, n) => sum +n, 0);
}

/*
function makeMap(inputs, rules, debug = false) {
  inputs.sort((a, b) => a.length - b.length); //put in order by word length
  debug && console.log("======== MakeMap");
  debug && console.log(rules);
  debug && console.log(inputs);
  const map = inputs.reduce((map, word) => {
    const ruleset = rules[word.length];
    ruleset.forEach(([digit, intersectionWith4, intersectionWith7]) => {
      if (intersectionWith4 === undefined) {
        map[digit] = word;
      } else {
        const is4 = getIntersectionLength(word, map[4]),
          is7 = getIntersectionLength(word, map[7]);
        if (is4 === intersectionWith4 && is7 === intersectionWith7) {
          map[digit] = word ;
        }
      }
    });
    return map;
  }, Array(10));
  debug && console.log(map);
  debug && console.log("======== MakeMap END");
  return map;
}
*/

function completeMap(map, inputs, debug = false) {
  debug && console.log("=== Complete map");
  debug && console.log("Inputs", inputs);
  debug && console.log(map);
  let defined;

  defined = Object.values(map).filter(w => w);
  inputs = inputs.filter(word => !defined.includes(word));
  // debug && console.log("Filtered inputs", inputs);

  // find 3 & 9
  inputs.forEach(word => {
    if (word.length === 5 && getIntersectionLength(word, map[7]) === 3) {
      map[3] = word;
      defined.push(word);
    }
    if (word.length === 6 && getIntersectionLength(word, map[4]) === 4) {
      map[9] = word;
      defined.push(word);
    }
  });
  inputs = inputs.filter(word => !defined.includes(word));

  // debug && console.log(map);
  // debug && console.log("Filtered inputs", inputs);

  // find 5 & 0
  inputs.forEach(word => {
    if (word.length === 5 && getIntersectionLength(word, map[4]) === 3) {
      map[5] = word;
      defined.push(word);
    }
    if (word.length === 6 && getIntersectionLength(word, map[7]) === 3) {
      map[0] = word;
      defined.push(word);
    }
  });
  inputs = inputs.filter(word => !defined.includes(word));

  // debug && console.log(map);
  // debug && console.log("Filtered inputs", inputs);

  // find 2 & 6
  inputs.forEach(word => {
    if (word.length === 5) {
      map[2] = word;
      defined.push(word);
    }
    if (word.length === 6) {
      map[6] = word;
      defined.push(word);
    }
  });
  debug && console.log("MAP", map);

  return map;
}

function getIntersectionLength(word1, word2) {
  word1 = word1.split("");
  return word2.split("").filter(l => word1.includes(l)).length;
}

function find1478(sentence) {
  return sentence.reduce((map, word) => {
    const digit = len2digit[word.length];
    if (digit !== undefined) {
      // console.log(output, l, digit);
      map[digit] = word;
    }
    return map;
  }, {});
}

function glue(arr) {
  return arr.join("");
}

function friendlyInput(input) {
  return input.map(({input, output}) => ({
    input: input.map(word => word.join("")),
    output: output.map(word => word.join("")),
  }));
}
