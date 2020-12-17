const { offset, xyz2XYZ } = require("./helper");

const input = [
  `.#.
..#
###`,
  `...#...#
..##.#.#
###..#..
........
...##.#.
.#.####.
...####.
..##...#`,
]
  .map(variant => {
    const active = {};
    variant.split("\n")
      .forEach((row, y) => {
        row.split('')
          .forEach((ch, x) => {
            if (ch === '#')
              active[xyz2XYZ(
                x + offset.x,
                y + offset.y,
                offset.z,
                offset.w)] = '#';
          })
      });
    return active;
  });

module.exports = input;
