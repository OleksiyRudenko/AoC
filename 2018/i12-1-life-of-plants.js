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
#..#. => #`.split("\n").map(s => ({pattern: s.slice(0, 5), result: s[9]}));
console.log(rules);

for (let gen = 0; gen < 20; gen++) {
  // console.log(gen, "======================================");
  console.log(gardenBed, gardenBed.length);
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
  gardenBed = // '.' +
    newGardenBed + '....';
  // zeroBase += 1;
  // console.log(gardenBed, gardenBed.length);
}

console.log(gardenBed, gardenBed.length);

let sumOfPotNos = gardenBed.split('')
  .reduce((acc, pot, i) => acc + (pot === '#' ? i - zeroBase : 0), 0);

console.log(sumOfPotNos);
