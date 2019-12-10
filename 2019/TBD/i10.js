let src = `.###.#...#.#.##.#.####..
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
  .split("\n");

const [w, h] = [src[0].length, src.length];

let map = src.map(str =>
    str.split(''));
let coords=map.map((row, r) =>
  row.reduce((acc, e, c) => e === '#' ? [...acc, [c, r]] : acc, []))
  .flat();

// console.log(w, h, src, coords, map);

const visibilityRegister = [];

coords.forEach(target => {
  const count = countVisible(target, coords);
  visibilityRegister.push(count);
});

const maxEntry = visibilityRegister.reduce((maxEntry, entry) => entry[1] > maxEntry[1] ? entry : maxEntry);

console.log('ANSWER 10-1', maxEntry[1]);

const base = maxEntry[0];



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
