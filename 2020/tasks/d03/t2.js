const {map, h, w} = require("./input");
console.log('==========================================================================================');

const steps = [{dx: 1,dy: 1}, {dx: 3,dy: 1}, {dx: 5,dy: 1}, {dx: 7,dy: 1}, {dx: 1,dy: 2}];

let counts = [];

for (let i = 0; i < steps.length; i++) {
  let pos = {
    x: 0,
    y: 0,
  };
  let step = steps[i];
  let count = 0;
  try {
    while (true) {
      if (map[pos.y][pos.x] === '#') count++;
      pos = jump(pos, step, w, h);
    }
  } catch (e) {
    counts.push(count);
  }
}

const m = counts.reduce((m, v) => m*v);

console.log(m, counts);

function jump({x, y}, {dx, dy}, w, h) {
  x += dx;
  if (x >= w) x = x - w;
  y += dy;
  if (y >= h) throw new RangeError();
  return {x, y};
}


console.log('==========================================================================================');
