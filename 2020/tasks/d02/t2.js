const input = require("./input");

console.log(input[1]);

let count = input
  .reduce((acc, [[p1, p2], needle, hay]) => {
    return xor(hay[p1-1] === needle, hay[p2-1] === needle) ? acc + 1 : acc;
  }, 0);

console.log(count);

function xor(c1, c2) {
  return ( c1 && !c2 ) || ( !c1 && c2 );
}
