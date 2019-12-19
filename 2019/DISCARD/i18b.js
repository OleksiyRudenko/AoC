const testSuite = require("../TBD/test-suite");
const T = require("../TBD/tools");
const mainInput = require("../TBD/i18--input");

console.log('====================== ABANDONED, QUESTIONABLE AND COMPLEX APPROACH ====================');

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
  const mxClone = T.cloneMatrix(mx);
  let probes = [{
    v: '@', // A..Z, a..z, . (pure fork), @(root, perhaps fork)
    c: start,
    d: {
      global: 0,
      fromParent: 0,
    },
    // path: '',
    ticks: {
      total: 0,
      skipped: 0,
    },
    parent: null,
    children: [],
  }];
  let newProbes, probesAcc = [];
  let distance = 0;
  let ticks = 0;
  let keys = [];

  while (probes.length > 0) {
    newProbes = [];
    probes.forEach(probe => {
      const currentTile = mxClone[probe.c[1]][probe.c[0]];

      const newProbe = {
        ...probe,
        v: currentTile,
        d: {
          global: distance,
          fromParent: probe.d.fromParent + 1,
        },
        ticks: {
          total: ticks,
          skipped: probe.ticks.skipped,
        },
      };
      console.log('CURRENT', probe);
      console.log('=>', newProbe);

      // explore surroundings
      const targets = [
        [probe.c[0], probe.c[1] - 1], // above
        [probe.c[0], probe.c[1] + 1], // below
        [probe.c[0] - 1, probe.c[1]], // to the left
        [probe.c[0] + 1, probe.c[1]], // to the right
      ];

      let doSaveAndSpawn = false;

      const tiles = targets.map(c => ({c: c, tile: mxClone[c[1]][c[0]]}))
        .filter(tile => tile.tile !== '#' && tile !== '*');
      if (tiles.length === 0) {
        // dead end
        if (currentTile !== '.') {
          probesAcc.push({
            ...newProbe,
            d: {
              global: distance,
              fromParent: newProbe.d.fromParent + 1,
            },
            ticks: {
              total: ticks,
              skipped: newProbe.ticks.skipped,
            },
          });
        }
      } else if (tiles.length === 1) {
        if (currentTile === '.') {
          // just advance
          newProbes.push(newProbe);
        } else {
          // it is A-Z => spawn if there is a key or skipped++, a-z => spawn
          if (currentTile >= 'a' && currentTile <= 'z') {
            keys.push(currentTile);
            doSaveAndSpawn = true;
          }
          if (currentTile >= 'A' && currentTile <= 'Z') {
            if (keys.includes(currentTile.toLowerCase())) {
              doSaveAndSpawn = true;
            } else {
              newProbe.ticks.skipped++;
              newProbes.push(newProbe);
            }
          }
        }
      } else {
        // spawn fork
        doSaveAndSpawn = true;
      }

      if (doSaveAndSpawn) {
        probesAcc.push(newProbe);

        tiles.map(tile => ({
          v: tile.tile, // A..Z, a..z, . (pure fork), @(root, perhaps fork)
          c: [...tile.c],
          d: {
            global: distance,
            fromParent: 0,
          },
          // path: '',
          ticks: {
            total: ticks,
            skipped: 0,
          },
          parent: newProbe,
          children: [],
        })).forEach(child => {
          newProbes.push(child);
          // newProbe.children.push(child);
        });
      }
    });

    probes = newProbes;
  }

  distance++;
  ticks++;

  console.log('COLLECTED', keys, probesAcc);
  console.log('LOST', probes);

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

