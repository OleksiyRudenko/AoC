const M = require("./tools");

const testSuites = [
  { name: "gcd",
    tests: [
      { op: M.gcd(3,9), expected: 3, errorMessage: "M.gcd(3,9)" },
      { op: M.gcd(16,12), expected: 4, errorMessage: "M.gcd(16,12)" },
  ]},
  { name: "lcm",
    tests: [
      { op: M.lcm(3, 9, 27), expected: 27, errorMessage: "M.lcm(3, 9, 27)" },
      { op: M.lcm(8, 16, 12), expected: 48, errorMessage: "M.lcm(8, 16, 12)" },
    ]},
  { name: "sum",
    tests: [
      { op: [3, 9, 27].reduce(M.sum), expected: 39, errorMessage: "[3, 9, 27].reduce(M.sum)" },
      { op: [8, 16, 12].reduce(M.sum), expected: 36, errorMessage: "[8, 16, 12].reduce(M.sum)" },
    ]},
  { name: "max",
    tests: [
      { op: [3, 9, 27].reduce(M.max), expected: 27, errorMessage: "[3, 9, 27].reduce(M.max)" },
      { op: [88, 16, 12].reduce(M.max), expected: 88, errorMessage: "[88, 16, 12].reduce(M.max)" },
    ]},
  { name: "min",
    tests: [
      { op: [3, 9, -27].reduce(M.min), expected: -27, errorMessage: "[3, 9, -27].reduce(M.min)" },
      { op: [-88, 16, 12].reduce(M.min), expected: -88, errorMessage: "[-88, 16, 12].reduce(M.min)" },
    ]},
  { name: "sort09",
    tests: [
      { op: [3, -9, -27].sort(M.sort09).join(','), expected: '-27,-9,3', errorMessage: "[3, -9, -27].sort(M.sort09)" },
      { op: [8, -16, -12].sort(M.sort09).join(','), expected: '-16,-12,8', errorMessage: "[8, -16, -12].sort(M.sort09).join(',')" },
    ]},
];

testSuites.forEach(suite => {
  console.log('Suite', suite.name);
  suite.tests.forEach(test => {
    console.assert(test.op === test.expected, test.errorMessage + " should return " + test.expected + ". " + test.op + " received.");
  });
});
