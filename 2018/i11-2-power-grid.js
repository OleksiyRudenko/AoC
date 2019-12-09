console.log("FAILS");

const serial = 42;

const grid = new Array(300).fill(null,0,300)
  .map((e, row) => new Array(300).fill(0, 0, 300)
    .map((e, col) => getCellPower(col + 1, row + 1, serial)));

for (let r = 0; r < 5; r++)
  console.log(grid[r].slice(0, 30));

let maxPower = {
  power: Number.MIN_SAFE_INTEGER,
  x: 1,
  y: 1,
  dim: 0,
};
for (let i = 1; i <= 300; i++) {
  const powerSubGrid = findMaxPower(grid, i);
  if (i === 1) console.log(powerSubGrid);
  if (powerSubGrid.power > maxPower.power)
    maxPower = Object.assign({}, powerSubGrid, {dim: i});
}
console.log(maxPower);

function findMaxPower(grid, subGridDim) {
  let maxPower = {
    power: grid[0][0],
    x: 1,
    y: 1,
  };
  const gridDim = grid.length;
  for (let x = 0; x < gridDim - subGridDim + 1; x += subGridDim)
    for (let y = 0; y < gridDim - subGridDim + 1; y += subGridDim) {
      const subGridPower = getSubGridPower(grid, x+1, y+1, subGridDim);
      if (subGridPower > maxPower.power) maxPower = {
        power: subGridPower,
        x: x+1,
        y: y+1,
      };
    }
  return maxPower;
}

function getSubGridPower(grid, x, y, subGridDim) {
  let power = 0;
  for (let i = x; i < x + subGridDim; i++)
    for (let j = y; j < y + subGridDim; j++) {
      power += grid[j-1][i-1];
    }
  return power;
}

function getCellPower(x, y, serial) {
  const rackId = x + 10;
  const interim = (((rackId * y + serial) * rackId) + '').padStart(3, '0');
  return +interim[interim.length - 3] - 5;
}
