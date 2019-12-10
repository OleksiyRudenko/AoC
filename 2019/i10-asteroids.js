let src =
  `.###.#...#.#.##.#.####..
.#....#####...#.######..
#.#.###.###.#.....#.####
##.###..##..####.#.####.
###########.#######.##.#
##########.#########.##.
.#.##.########.##...###.
###.#.##.#####.#.###.###
##.#####.##..###.#.##.#.
.#.#.#####.####.#..#####
.###.#####.#..#..##.#.##
########.##.#...########
.####..##..#.###.###.#.#
....######.##.#.######.#
###.####.######.#....###
############.#.#.##.####
##...##..####.####.#..##
.###.#########.###..#.##
#.##.#.#...##...#####..#
##.#..###############.##
##.###.#####.##.######..
##.#####.#.#.##..#######
...#######.######...####
#....#.#.#.####.#.#.#.##`
  /* `.#..#
.....
#####
....#
...##` */
  /* `.#....#####...#..
##...##.#####..##
##...#...#.#####.
..#.....#...###..
..#.#.....#....##` */
  .split("\n");

const [w, h] = [src[0].length, src.length];

let map2d = src.map(str =>
    str.split(''));
let coords=map2d
  .map((row, r) => row.reduce((acc, e, c) => e === '#' ? [...acc, [c, r]] : acc, []))
  .flat();
// console.log(Array.isArray(coords));

// console.log('w', w, 'h', h, 'src', src, 'c', coords, 'map', map2d);

const visibilityRegister = [];

coords.forEach(target => {
  const count = countVisible(target, coords);
  visibilityRegister.push(count);
});

const maxEntry = visibilityRegister.reduce((maxEntry, entry) => entry[1] > maxEntry[1] ? entry : maxEntry);

console.log('ANSWER 10-1', maxEntry[1], 'from', maxEntry);

const base = maxEntry[0];

const richCoords = coords
  .filter(e => !(e[0] === base[0] && e[1] === base[1])) // remove base
  .map(e => ({
    o: [...e], // original coords
    c: [e[0] - base[0], base[1] - e[1]], // centered by base
  }))
  .map(e => ({
    ...e,
    g: getGradient(e.c),
    md: Math.abs(e.c[0]) + Math.abs(e.c[1]), // Manhattan distance
  }))
  .sort((a, b) => a.g - b.g)
  .map((e, idx) => ({
    ...e,
    id: idx,
  }));

// console.log('SORTED by GRADIENT', richCoords);

let count = 0;
drawMap(richCoords, base, w, h);
let next = [...richCoords];
try {
  while (next.length) {
    const current = next.filter(Boolean).map((e, idx) => ({
      ...e,
      id: idx,
    }));
    next = [];
    current.forEach(e => {
      const beam = current
        .filter(subE => subE.g === e.g) // get all items from same beam
        .sort((a, b) => a.md - b.md);
      // console.log('BEAM', 'BASE ITEM', e, 'BEAM', beam);
      const target = beam.splice(0,1)[0];
      // console.log('DELETE', target, 'REMAINS', beam);
      delete current[target.id];
      // move others from the beam to next
      next = [...next, ...beam];
      beam.forEach(e => {
        delete current[e.id];
      });
      if (++count === 200) {
        console.log('>>>>>>>>>>> TARGET 200', target);
        throw new Error(target.o[0] + (target.o[1]+'').padStart(2,'0'));
      }
      // drawMap(current, base, w, h);
    });
  }
} catch (e) {
  console.log('ANSWER 10-2', e.message);
}

function countVisible(target, all) {
  const [x, y] = target;
  const distances = all.map(e => [e[0], e[1]]) // clone all
    .filter(e => !(e[0] === x && e[1] === y)) // remove target
    .map(e => [e[0] - x, e[1] - y]); // distance deltas
  // vectorize
  const vectors = distances.map(e => {
    let [ax, ay] = [e[0], e[1]];
    const factor = gcd(ax, ay);
    return (e[0]/factor) + '' + (e[1]/factor);
  });
  // exclude duplicates and count
  const unique = vectors.reduce((acc, v) => {
    acc[v] = true;
    return acc;
  }, {});
  const result = Object.keys(unique).length;
  return [target, result];
}

function gcd(a ,b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while(b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

/*
function getVector(coords) {
  const [x, y] = coords;
  const factor = gcd(x,y);
  return (x/factor) + '' + (y/factor);
} */

function getGradient(coords) {
  const [x, y] = coords;
  const [ax, ay] = [Math.abs(x), Math.abs(y)];
  let quarter = 999;
  if (x>=0 && y>0) {
    quarter = 0;
    if (ay <= ax) return 1 - ay/ax + 1 + quarter;
    return ax/ay + quarter;
  } else if (x > 0 && y<=0) {
    quarter = 2;
    if (ax <= ay) return 1 - ax/ay + 1 + quarter;
    return ay/ax + quarter;
  } else if (x<=0 && y<0) {
    quarter = 4;
    if (ay <= ax) return 1 - ay/ax + 1 + quarter;
    return ax/ay + quarter;
  } else if (x<0 && y>=0) {
    quarter = 6;
    if (ax <= ay) return 1 - ax/ay + 1 + quarter;
    return ay/ax + quarter;
  }
  return null;
}

function drawMap(richCoords, base, w, h) {
  const map = [];
  for (let r = 0; r < h; r++) {
    map.push(new Array(w).fill('.'));
  }
  richCoords.forEach(e => {
    if (e) map[e.o[1]][e.o[0]] = '#';
  });
  map[base[1]][base[0]] = 'X';
  console.log("====== MAP ======", richCoords.length);
  console.log("Warning: same beam items are not shown as well!");
  map.forEach(r => {
    console.log(r.join(''));
  });
}
