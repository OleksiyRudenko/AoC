const testSuite = require("./TBD/test-suite");
const T = require("./TBD/tools");
const INPUT = require("./TBD/i20--input");

let testSet = testSuite.xform(xform, [
  {
    input: INPUT[0],
    expected: 23,
  },
  {
    input: INPUT[1],
    expected: 58,
  },
  // skip INPUT[2] for it is designated for the part 2 only
  {
    input: INPUT[3],
    expected: 674,
  },
]);

const lastAnswer = testSuite.run(main, testSet, friendlyInput, 3);

console.log("ANSWER X-1", lastAnswer);

function main(mx) {
  const start = findPortal(mx, startPortalValue());
  console.log(T.matrix2lines(mx));

  return traverse(mx, start);
}

function traverse(mx, start) {
  // deploy 1st probe
  let probes = [start];
  mx[start[1]][start[0]] = '.';
  let newProbes;
  const targetPortal = endPortalValue();
  let distance = 0;

  while (probes.length) {
    newProbes = [];
    // console.log('=== DISTANCE', distance);

    for (let i = 0; i < probes.length; i++) {
      const probe = probes[i];
      // console.log('PROBE', probe);
      const tile = getTile(mx, probe);
      // console.log('value', tile);
      if (tile === targetPortal) {
        return distance; // success
      }
      mx[probe[1]][probe[0]] = 'x';
      if (tile !== '.') {
        // jump
        // console.log('>>> PROBE IS ON PORTAL', portalId2str(tile));
        const destination = findPortal(mx, tile, probe);
        if (destination[0] !== null && destination[1] !== null) {
          // destination wasn't yet visited

          // make destination '.' for it becomes a regular tile now
          mx[destination[1]][destination[0]] = '.';
          newProbes.push(destination);
        } // die otherwise

      } else {
        // spawn
        const targetDeltas = [ [0,-1], [1,0], [0,1], [-1,0] ]; // above, right, below, left
        const tiles = targetDeltas.map(td => mx[probe[1] + td[1]][probe[0] + td[0]]);
        tiles.forEach((tile, idx) => {
          if (tile !== '#' && tile !== 'x' && tile !== '-') {
            newProbes.push([
              probe[0] + targetDeltas[idx][0],
              probe[1] + targetDeltas[idx][1]
            ]);
          }
        });
      }
    }
    ++distance;
    probes = newProbes;
  }
  return 0;
}

function portalId2str(portalId) {
  const portalCharCode = portalId.charCodeAt(0);
  return String.fromCharCode(~~(portalCharCode / 256)) + String.fromCharCode(portalCharCode % 256);
}

function getTile(mx, coords) {
  return mx[coords[1]][coords[0]];
}

function startPortalValue() {
  const char = 'A'.charCodeAt(0);
  return String.fromCharCode(char * 256 + char); }

function endPortalValue() {
  const char = 'Z'.charCodeAt(0);
  return String.fromCharCode(char * 256 + char); }

function findPortal(mx, portalId, excludeLocation = [0,0]) {
  // console.log('SEARCH PORTAL', portalId2str(portalId), excludeLocation);
  for (let r = 0; r < mx.length; r++) {
    for (let c = 0; c < mx[r].length; c++) {
      if (mx[r][c] === portalId) {
        if (c !== excludeLocation[0] || r !== excludeLocation[1])
        return [c, r];
      }
    }
  }
  return [null, null];
}

function xform(input) {
  const rows = input.split("\n")
    .map(r => ' '+r+' ')
    .map(r => r.replace(/\040/g, '-'));
  // add top and bottom empty rows
  const rowLen = rows[0].length;
  const emptyRow = '-'.repeat(rowLen);
  rows.push(emptyRow);
  rows.unshift(emptyRow);

  // replace portal code with a unicode char
  const mx = rows.map(row => row.split(''));

  for (let r = 1; r < rows.length - 1; r++) {
    for (let c = 1; c < mx[r].length - 1; c++) {
      if (mx[r][c] >= 'A' && mx[r][c] <= 'Z') {
        const portalId1 = mx[r][c].charCodeAt(0);
        // find second char
        const targetDeltas = [ [0,-1], [1,0], [0,1], [-1,0] ]; // above, right, below, left
        const tiles = targetDeltas.map(xy => mx[r + xy[1]][c + xy[0]]);
        const targetDir = tiles.reduce((d, e, idx) => e >= 'A' && e <= 'Z' ? idx : d, null);
        const portalId2 = tiles[targetDir].charCodeAt(0);

        const portalId = targetDir === 1 || targetDir === 2
          ? String.fromCharCode(portalId1 * 256 + portalId2)
          : String.fromCharCode(portalId2 * 256 + portalId1);

        // remove old chars
        mx[r][c] = '-';
        const portalId2Coords = targetDeltas[targetDir];
        mx[r + portalId2Coords[1]][c + portalId2Coords[0]] = '-';

        // insert xformed portal
        const realPortalDxyOptions = [
          targetDeltas[(targetDir + 2) % 4], // opposite to 2nd char
          [portalId2Coords[0] * 2, portalId2Coords[1] * 2], // next 2 nd char
        ];

        const rpTiles = realPortalDxyOptions.map(xy => mx[r+xy[1]][c+xy[0]]);
        const rpLocation = rpTiles.reduce((d, v, idx) => v === '.' ? idx : d, 0);
        const rpDeltas = realPortalDxyOptions[rpLocation];

        mx[r + rpDeltas[1]][c + rpDeltas[0]] = portalId;
      }
    }
  }

  return mx;
}

function friendlyInput(input) {
  return input.join('').slice(0,32);
}
