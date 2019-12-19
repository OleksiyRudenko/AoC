const testSuite = require("../TBD/test-suite");
const T = require("../TBD/tools");
const mainInput = require("../TBD/i18--input");

console.log('====================== ABANDONED, WRONG APPROACH ====================');

let testSet = testSuite.xform(xform, [
  {
    input: `########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`,
    expected: 86, // abcdef better than abcedf
    /*
    requires =
    f : DECA
    d : B
    e : CA
    b : A
    c : B
    a : null
    target = f
    path = ?
     */
  },
  {
    input: `########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################`,
    expected: 132, // bacdefeg
  },
  {
    input: `#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`,
    expected: 136, // a, f, b, j, g, n, h, d, l, o, e, p, c, i, k, m
  },
  {
    input: `########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################`,
    expected: 81, //  a, c, f, i, d, g, b, e, h
  },
  {
    input: mainInput,
    expected: 0,
  },
]);

const lastAnswer = testSuite.run(main, testSet, T.matrix2lines, 1);

console.log("ANSWER X-1", lastAnswer);

function main(mx) {
  const start = findStart(mx, '@');

  console.log(T.matrix2lines(mx));
  console.log(start);

  // explore arena
  let probes = [{v:'@',l:start,d:0,p:''}], newProbes;
  let distance = 1;
  let items = [];
  const mxClone = T.cloneMatrix(mx);

  while (probes.length > 0) {
    newProbes = [];
    probes.forEach(probe => {
      // generate new sources
      const targets = [
        [probe.l[0], probe.l[1]-1], // above
        [probe.l[0], probe.l[1]+1], // below
        [probe.l[0]-1, probe.l[1]], // to the left
        [probe.l[0]+1, probe.l[1]], // to the right
      ];
      targets.forEach(target => {
        const targetTile = mxClone[target[1]][target[0]];
        if (targetTile !== '#' && targetTile !== '*') {
          // console.log('FOUND', targetTile, target);
          const newProbe = {
            v: targetTile,
            l: target,
            d: distance,
            p: probe.p + targetTile,
          };
          if (targetTile >= 'A') {
            items.push(newProbe);
          }
          mxClone[target[1]][target[0]] = '*';
          newProbes.push(newProbe);
        }
      });
    });
    distance++;
    probes = newProbes;
  }

  console.log('ITEMS FOUND', items);

  // Find optimal pathway

  // find first key
  let keyIndex = items.findIndex(e => isKey(e.v));
  let key = items[keyIndex];
  let travelDistance = key.d;
  items = remove(items, keyIndex);
  let currentItem;
  console.log('KEY', keyIndex, key);
  console.log('REMAINING ITEMS', items);

  currentItem = key;
  // enrich remaining items with distance to current item
  items = items.map(e => {
    let dc = e.d + currentItem.d * (
      e.p.indexOf(currentItem.v) >=0 ? -1 : 1
    );
    return {
      ...e,
      dc,
    };
  });
  items.sort((a, b) => a.dc - b.dc);
  console.log('ENRICHED ITEMS', items);


  return '';
}

function remove(arr, index) {
  return arr.filter((e, i) => i!==index);
}

function isKey(c) {
  return c>='a' && c<='z';
}

function findStart(map, needle = '@') {
  for (let r = map.length - 1; r >= 0; r--) {
    const row = map[r];
    for (let c = row.length - 1; c >= 0; c--) {
      if (row[c] === needle) {
        return [c, r];
      }
    }
  }
  return [null, null];
}

function nextDir(dir, turn = 0) { // dir, turn 0|-1 left, 1 right
  const dirTurn = [ // [dirWhenTurnLeft==counterClockWise, dirWhenTurnRight==clockWise]
    undefined,
    [3, 4],
    [4, 3],
    [2, 1],
    [1, 2],
  ];
  const next = turn > 0 ? 1 : 0;
  return dirTurn[dir][next];
}

function nextLocation(loc, dir) { // [x,y], dir
  const dirTargetOffset = [
    undefined,
    [0, 1],  // 1: north
    [0, -1], // 2: south
    [-1, 0], // 3: west
    [1, 0],  // 4: east
  ];
  return [loc[0] + dirTargetOffset[dir][0], loc[1] + dirTargetOffset[dir][1]];
}

function xform(input) {
  return input.split("\n").map(s=>s.split(''));
}

