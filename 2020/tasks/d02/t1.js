const input = require("./input");

console.log(input[1]);

let count = input
  .reduce((acc, [[from, to], needle, hay]) => {
    const count = (hay.match(new RegExp(needle, 'g')) || []).length;
    return count >= from && count <= to ? acc + 1 : acc;
  }, 0);

console.log(count);