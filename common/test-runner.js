const { ruler } =
  require('./helpers');

const test = (actual, expected, input) => {
  if (actual !== expected) {
    console.error("--- AoC TEST FAILED ---");
    console.error("> From input");
    console.error(input);
    console.error("> expected", expected);
    console.error("> received", actual);
    console.log(ruler('!'));
    return "Failure";
  }
  console.log("+++ AoC TEST PASSED +++");
  console.log("> From input");
  console.log(input);
  console.log("> received", expected);
  console.log(ruler('+'));
  return "Success";
};

const run = (cbMain, testSet, testsToRun = 'all', cbInputHumanize = v => v) => {
  if (testsToRun === undefined || testsToRun === 'all') {
    testsToRun = new Array(testSet.length).fill(0).map((e, index) => index);
  }
  if (testsToRun === 'last') testsToRun = [testSet.length - 1];
  if (!Array.isArray(testsToRun)) testsToRun = [testsToRun];
  console.log(testsToRun)
  let lastResult = undefined;
  testsToRun.forEach(testId => {
    console.log("Test #" + testId);
    const testCase = testSet[testId];
    if (!testCase) {
      console.log("!!! Test case not defined !!!");
      return;
    }
    lastResult = cbMain(testCase.input);
    test(lastResult, testCase.expected, cbInputHumanize(testCase.input));
  });
  return lastResult;
}

module.exports = run;
