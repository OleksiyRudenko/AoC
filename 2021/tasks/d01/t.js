const depthReadings = require("./input");
console.log('==========================================================================================');

// =============== task 2 only pre-processing
const reduced = [];
const [r1, r2] = depthReadings;
const triplet = [r1 , r2];
const len = depthReadings.length;
for (let i = 2; i < len; i++) {
  triplet.push(depthReadings[i]);
  reduced.push(triplet.reduce((sum, e) => sum + e, 0));
  triplet.shift();
}

// =============== tasks 1 and 2 main code
const {count} = reduced.reduce((state, item) => {
  if (state.prev !== -1 && item > state.prev) { state.count++; }
  state.prev = item;
  return state;
}, {prev: -1, count: 0});

console.log(count) ;

console.log('==========================================================================================');
