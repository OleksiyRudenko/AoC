const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 'n/a', 2208, 4120, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [2], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  let floor = {};
  input.forEach(path => {
    const tile = path.reduce((coords, step) => {
      coords = go(coords, step);
      return coords;
    }, [0, 0]);
    const location = cc2str(tile);
    if (floor[location]) {
      console.log("-", location);
      delete floor[location];
    } else {
      console.log("+", location);
      floor[location] = 1;
    }
  });

  for (let i = 0; i < 100; i++) {
    let floorMap = {}, newFloor = {};

    console.log("=======================================");
    console.log('From blacks #', Object.keys(floor).length);
    // build from blacks
    Object.keys(floor).forEach(tile => {
      floorMap[tile] = 1;
      tile = str2cc(tile);
      createWhites(floorMap, tile, 0);
    });
    console.log('floor map cells #', Object.keys(floorMap).length) ;

    // apply rules
    Object.keys(floorMap)
      .forEach(tile => {
        tile = str2cc(tile);
        const blackNeighbors = getNeighbors(tile)
          .map(neighbor => floor[neighbor])
          .filter(v => v)
          .length;
        if (floorMap[tile]) {
          if (blackNeighbors === 1 || blackNeighbors === 2) {
            newFloor[tile] = 1;
          }
        } else {
          if (blackNeighbors === 2) {
            newFloor[tile] = 1;
          }
        }
      });
    console.log('New floor #', Object.keys(newFloor).length) ;

    // cleanup
    Object.keys(newFloor).forEach(tile => {
      if (!newFloor[tile]) delete newFloor[tile];
    });

    console.log('New floor cleaned up #', Object.keys(newFloor).length) ;

    floor = newFloor;
  }

  return Object.keys(floor).length;
}

function createWhites(floor, base, depth = 1) {
  getNeighbors(base)
    .forEach(neighbor => {
      if (floor[neighbor] === undefined) {
        floor[neighbor] = 0;
        if (depth) {
          createWhites(floor, neighbor, depth - 1);
        }
      }
    });
}

function getNeighbors(base) {
  return ["e", "w", "ne", "nw", "se", "sw"]
    .map(dir => go(base, dir));
}

function str2cc(str) {
  return str.split(",").map(c => +c);
}

function cc2str(cc) {
  return cc.join(",");
}

function go([x, y], step) {
  const t = [x, y];
  switch (step) {
    case 'e':
      x++;
      break;
    case 'se':
      y++;
      x += odd(y) ? 1 : 0;
      break;
    case 'ne':
      y--;
      x += odd(y) ? 1 : 0;
      break;
    case 'w':
      x--;
      break;
    case 'sw':
      y++;
      x += odd(y) ? 0 : -1;
      break;
    case 'nw':
      y--;
      x += odd(y) ? 0 : -1;
      break;
  }
  // console.log('*', t, step, [x, y]);
  return [x, y];
}

function odd(v) {
  return Math.abs(v) % 2;
}

function friendlyInput(input) {
  return input[0];
}
