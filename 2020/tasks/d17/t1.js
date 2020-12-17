const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { offset, xyz2XYZ, XYZ2xyz } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 112, 223, ]
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
  let active = input;
  for (let i = 0; i < 6; i++) {
    console.log('>>>>>>>');
    console.log('ACTIVE', active);
    // list spots to  visit
    const next = {};
    Object.keys(active)
      .forEach(activeXYZ => {
        const [x, y ,z] = XYZ2xyz(activeXYZ);
        // console.log(x, y, z);
        for (let dx = -1; dx < 2; dx++)
          for (let dy = -1; dy < 2; dy++)
            for (let dz = -1; dz < 2; dz++)
              next[xyz2XYZ(x+dx, y+dy, z+dz)] = undefined;
      });
    console.log('NEXT', next);
    // check spots and activate as appropriate
    Object.keys(next)
      .forEach(XYZ => {
        const [x, y ,z] = XYZ2xyz(XYZ);
        let count = 0;
        // console.log(x, y, z);
        for (let dx = -1; dx < 2; dx++)
          for (let dy = -1; dy < 2; dy++)
            for (let dz = -1; dz < 2; dz++)
              if ((dx || dy || dz) && active[xyz2XYZ(x+dx, y+dy, z+dz)])
                count++;
        console.log('?', [x,y,z], active[XYZ], count);
        if (active[XYZ]) {
          if (count === 2 || count === 3) {
            next[xyz2XYZ(x, y, z)] = '#';
          }
        } else {
          if (count === 3) {
            next[xyz2XYZ(x, y, z)] = '#';
          }
        }
      });
    console.log('NEXT populated', next);
    // remove inactive
    Object.keys(next)
      .forEach(XYZ => {
        if (!next[XYZ]) delete next[XYZ];
      });
    console.log('NEXT clean', next);

    active = next;
  }


  // count
  return Object.keys(active).length;
}

function friendlyInput(input) {
  return input;
}
