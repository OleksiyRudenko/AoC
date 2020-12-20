const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const INPUT2 = require("./input2");
const { purgeArray, isPairEq, getBorder, flip, rotate } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 273, 1957, ]
  .map((expected, index) => ({
    input: [INPUT[index], INPUT2[index]],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main([input, input2]) {
  const originalTileBorders =
    JSON.parse(JSON.stringify(input));
  console.log("3079:");
  console.log(input[3079]);
  let keys = Object.keys(input);
  const mapDim = Math.sqrt(keys.length);
  for (let i = 0; i < keys.length - 1; i++) {
    const currborders = input[keys[i]];
    // if (!i)
    // console.log('B:', currborders);
    for (let j = i+1; j < keys.length; j++) {
      const nextborders = input[keys[j]];
      let matchesCount = 0;
      for (let k = 0; k < 4; k++) {
        for (let l = 0; l < 4; l++) {
          if (isPairEq(currborders[k], nextborders[l])) {
            delete(currborders[k]);
            delete(nextborders[l]);
            matchesCount++;
          }
        }
      }
      // if (matchesCount > 0) console.log('MC', matchesCount);
    }
  }
  /* console.log("FILTERED OUT");
  console.log(input); */

  const cornerTiles = [];
  keys.forEach(key => {
    if (purgeArray(input[key]).length === 2) {
      cornerTiles.push(+key);
    }
  });

  // build tiles matrix
  const tileMx = new Array(mapDim)
    .fill(0).map(() => []);

  /// find UL tile
  // ....
  let tileIdx = cornerTiles.find(tileId => {
    if (Array.isArray(input[tileId][0]) && Array.isArray(input[tileId][3]))
      return true;
    return false;
  });
  let currentTile = input2[tileIdx];

  let fails = 0;

  for (let r = 0; r < mapDim; r++) {
    for (let c = 0; c < mapDim; c++) {
      tileMx[r][c] = currentTile;
      delete input2[tileIdx];

      // skip searching next if current was last
      if (!(r === mapDim - 1 && c === mapDim - 1)) {
        const targetBorderIdx = c+1 === mapDim ? 0 : 3; // top or left
        let targetBorder;
        if (c+1 === mapDim) {
          targetBorder = tileMx[r][0][9];
        } else {
          // next is 1st block in the next row
          targetBorder = currentTile.map(r => r[9]).join('');
        }

        let nextTile = null, nextId = undefined, count = 0;
        let found = false;

        for (let tileId in input2) {
          nextTile = input2[tileId];
          for (let i = 0; i < 8; i++) {
            nextTile = rotate(nextTile);
            if (targetBorder === getBorder(nextTile, targetBorderIdx)) {
              nextId = tileId;
              found = true;
              break;
            }
            if (i===3)
              nextTile = flip(nextTile);
          }
          if (found) break;
        }

        if (!found) {
          fails++;
          console.log("!!!!!!!!!!! No tile found!",
            " at [r,c]", [r,c],
            mapDim,
            " Tiles remaining", Object.keys(input2).length);
        }

        // const {nextId, nextTile} =
        //  getTile(input2, targetBorderIdx, border);

        currentTile=nextTile;
        tileIdx = nextId;
      }

    }
  }
  console.log('FAILS', fails, 'Remaining tiles', input2);

  // console.log(tileMx);
  //console.log(input2);

  // build map
  let map = new Array(mapDim * 8)
    .fill(0).map(() => []);

  tileMx.forEach((mxrow, mxi) => {
    for (let i = 0 ; i < 8; i++) {
      map[mxi*8 + i] = mxrow.map(tile => tile[1+i].slice(1,9)).join('') ;
    }
  });

  // map = rotate(rotate(rotate(rotate(map))));
  console.log(map);
  // find monster
  const monster = /^.{18}#.#.{4}##.{4}##.{4}###.#.{2}#.{2}#.{2}#.{2}#.{2}#.{3}$/
    /*
    `                  # `
    `#    ##    ##    ###`
    ` #  #  #  #  #  #   `
     */

  const mask = [
    [18, ],
    [0, 5, 6, 11, 12, 17, 18, 19, ],
    [1, 4, 7, 10, 13, 16, ],
  ];

  let mcount = [];

  for (let i = 0; i < 8; i++) {
    map = rotate(map);
    let monstersCount = 0;
    const w = map[0].length;
    const h = map.length;
    console.log([w,h]);
    for (let r = 0; r < h - 3; r++) {
      for (let c = 0; c < w - 20; c++) {
        const fragment =
          map[r].slice(c, c+20)
          + map[r+1].slice(c, c+20)
          + map[r+2].slice(c, c+20);

        if (fragment.match(monster)) {
          monstersCount++;
          for (let subr = 0; subr < mask.length; subr++) {
            const t = [...map[r+subr]];
            mask[subr].forEach(subc => {
              t[c + subc] = 'O';
            });
            map[r+subr] = t.join('');
          }
        }
      }
    }
    mcount.push(monstersCount);
    if (monstersCount) {
      break;
    }
    if (i === 3)
      map=flip(map);
  }
  console.log(mcount);

  // count waters
  console.log("=================== MONSTERS ==============");
  console.log(map);
  const lengths = map
    .map(row => row.split('')
      .filter(c => c === '#').length);

  // console.log(lengths);

  return lengths.reduce((sum, n) => sum+n, 0);

  // return cornerTiles.reduce((m, e) => m*e, 1);
}

function friendlyInput(input) {
  return ''; // input;
}
