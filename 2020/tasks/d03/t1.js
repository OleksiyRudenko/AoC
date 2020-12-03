const {map, h, w} = require("./input");
console.log('==========================================================================================');

const step = {
  dx: 3,
  dy: 1,
};

let pos = {
  x: 0,
  y: 0,
}

let count = 0;

try {
  while (true) {
    if (map[pos.y][pos.x] === '#') count++;
    pos = jump(pos, step, w, h);
  }
} catch (e) {
  console.log(count);
}

function jump({x, y}, {dx, dy}, w, h) {
  x += dx;
  if (x >= w) x = x - w;
  y += dy;
  if (y >= h) throw new RangeError();
  return {x, y};
}


console.log('==========================================================================================');
