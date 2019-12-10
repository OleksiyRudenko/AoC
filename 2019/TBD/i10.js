let src =
  /* `.###.#...#.#.##.#.####..
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
#....#.#.#.####.#.#.#.##` */
  `.#..#
.....
#####
....#
...##`
  .split("\n");

const [w, h] = [src[0].length, src.length];

let map2d = src.map(str =>
    str.split(''));
let coords=map2d
  .map((row, r) => row.reduce((acc, e, c) => e === '#' ? [...acc, [c, r]] : acc, []))
  .flat();
// console.log(Array.isArray(coords));

console.log('w', w, 'h', h, 'src', src, 'c', coords, 'map', map2d);

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
  .map(e => [e[0] - base[0], e[1] - base[1]]) // make base a center
  .map((e, idx) => ({
    id: idx,
    c: [...e],
    md: Math.abs(e[0]) + Math.abs(e[1]), // Manhattan distance
    v: getVector(e),
  }));

console.log(coords, richCoords);

// rotate radar
const wh = w > h ? w : h;
const eliminated = [];


let target = [0, 0];


const changingCoordinate = 0;
const step = 1;
const constCoordinate = changingCoordinate ? 0 : 1;
target[changingCoordinate] = 0;
target[constCoordinate] = wh + 1;
const startCoordinate = step === 1 ? 0 : wh + 1;
const endCoordinate = step === 1 ? wh + 1 : 0;

for (let i = startCoordinate; i !== endCoordinate; i += step) {
  target[changingCoordinate] = i;
  const vector = getVector(target);
  const beamed = richCoords.filter(e => e && e.v === vector);
  if (beamed.length) {
    const closest = beamed.reduce((min, e) => e.md < min.md ? e : min);
    eliminated.push(closest);
    delete richCoords[closest.id];
  }
}

console.log('ANSWER 10-2', '???');


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

function getVector(coords) {
  const [x, y] = coords;
  const factor = gcd(x,y);
  return (x/factor) + '' + (y/factor);
}
