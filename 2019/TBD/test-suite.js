const { test } = require("./tools");

const xform = (cb, testSet) => {
  return testSet.map(testCase => ({
    input: cb(testCase.input),
    expected: testCase.expected,
  }));
};

const run = (cbMain, testSet, cbInputXform = v => v, testsToRun = [0, 100]) => {
  const n = testSet.length;
  if (testsToRun === undefined) {
    testsToRun = [0, 100];
  }
  if (!Array.isArray(testsToRun)) {
    testsToRun = [0, testsToRun];
  }
  let lastResult;
  for (let i = testsToRun[0]; i < n && i < testsToRun[1]; i++) {
    const testCase = testSet[i];
    lastResult = cbMain(testCase.input);
    test(lastResult, testCase.expected, cbInputXform(testCase.input));
  }
  return lastResult;
};


module.exports = {
  xform,
  run,
};
