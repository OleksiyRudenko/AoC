testGetPower();

const serial = 5093;
let maxPower = {
  x: 1,
  y: 1,
  power: get3x3power(1, 1, serial),
};

for (x = 1; x < 300-2; x++)
  for (y = 1; y < 300-2; y++) {
    const power = get3x3power(x, y, serial);
    if (power > maxPower.power) {
      maxPower = { x, y, power};
    }
  }

console.log(maxPower);

function get3x3power(x, y, serial) {
  let power = 0;
  for (i = x; i < x+3; i++)
    for (j = y; j < y+3; j++) {
      power += getPower(i, j, serial);
    }
  return power;
}

function getPower(x, y, serial) {
  const rackId = x + 10;
  const interim = (((rackId * y + serial) * rackId) + '').padStart(3, '0');
  return +interim[interim.length - 3] - 5;
}

function testGetPower() {
  console.log("Test: all 0s means test passed", [
    [3, 5, 8, 4],
    [122, 79, 57, -5],
    [217, 196, 39, 0],
    [101, 153, 71, 4]
  ].map(e => getPower(e[0], e[1], e[2]) - e[3]));
}
