let gardenBed = '........' + // '............' +
  '.##..#.#..##..##..##...#####.#.....#..#..##.###.#.####......#.......#..###.#.#.##.#.#.###...##.###.#' +
  '....'; // + '............';
let zeroBase = 8;

const rules = `.##.# => #
##.#. => #
##... => #
#.... => .
.#..# => .
#.##. => .
.##.. => .
.#.## => .
###.. => .
..##. => #
##### => #
#...# => #
.#... => #
###.# => #
#.### => #
##..# => .
.###. => #
...## => .
..#.# => .
##.## => #
....# => .
#.#.# => #
#.#.. => .
.#### => .
...#. => #
..### => .
..#.. => #
..... => .
####. => .
#..## => #
.#.#. => .
#..#. => #`.split("\n")
  .map(s => ({pattern: s.slice(0, 5), result: s[9]}))
  .sort((a, b) => a.pattern > b.pattern ? -1 : 1);
// console.log(rules);

let gen;
let sumOfPotNos = sumPotNos(gardenBed);
for (gen = 0; gen < 500; gen++) {
  // console.log(gen, "======================================");
  // console.log(gen, gardenBed.length, potsCount(gardenBed), gardenBed);
  const newSumOfPotNos = sumPotNos(gardenBed);
  console.log(gen, sumPotNos(gardenBed), newSumOfPotNos - sumOfPotNos);
  sumOfPotNos = newSumOfPotNos;
  const l = gardenBed.length;
  let newGardenBed = gardenBed.slice(0, 2);
  for (let i = 0; i < l - 4; i++) {
    const prevPots = gardenBed.slice(i + 0, i + 2),
      currentPot = gardenBed.slice(i + 2, i + 3),
      nextPots = gardenBed.slice(i + 3, i + 5);
    const section = prevPots + currentPot + nextPots;
    const rule = rules.find(e => e.pattern === section);
    const potToBe = rule.result;
    newGardenBed += potToBe;
    // console.log(gen, i, currentPot, rule, newGardenBed);
  }

  // move the garden bed "window"
  let match = newGardenBed.match(/^(\.+)/);
  if (!match) match = [''];
  const headLen = match[0].length;
  if (headLen < 4) {
    // add up until head len is 4 & adjust zeroBase
    newGardenBed = '.'.repeat(4 - headLen) + newGardenBed;
    zeroBase += 4 - headLen;
  } else if (headLen > 4) {
    // cut head until its len is 4 & adjust zeroBase
    newGardenBed = newGardenBed.replace(/^\.+/, '....');
    zeroBase -= headLen - 4;
  }
  // cut tail until its len is 4
  newGardenBed = newGardenBed.replace(/\.+$/, '....');

  gardenBed = newGardenBed;
  // console.log(gardenBed, gardenBed.length);
}

console.log(gen, gardenBed.length, potsCount(gardenBed), gardenBed);

function potsCount(s) {
  return s.replace(/\./g,'').length;
}

function sumPotNos(gardenBed) {
  return gardenBed.split('')
    .reduce((acc, pot, i) => acc + (pot === '#' ? i - zeroBase : 0), 0);
}

console.log(sumPotNos(gardenBed));

console.log((50000000000 - 500) * 78 + 41467);
