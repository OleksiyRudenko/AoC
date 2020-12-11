const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');

function runTick(mx) {
  const rows = mx.length,
    cols = mx[0].length;
  let outMx = makeMatrix(rows, cols, '.');
  for (let row = 0; row < rows; row++) {
    for (let col = 0 ; col < cols; col++) {
      newSeatStatus = mx[row][col];
      if (mx[row][col] !== '.') {
        const occupied = getOccupied(mx, row, col);
        if (newSeatStatus === 'L' && !occupied) {
          newSeatStatus = '#';
        } else if (newSeatStatus === '#' && occupied >= 4) {
          newSeatStatus = 'L';
        }
      }
      outMx[row][col] = newSeatStatus;
    }
  }
  return outMx;
}

function getOccupied(mx, row, col) {
  let occupied = 0;
  const rows = mx.length,
    cols = mx[0].length;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j<2; j++) {
      const tr = row + i, tc = col + j;
      if (tr >= 0 && tc >= 0
        && tr < rows && tc < cols
        && !(tr === row && tc === col)) {
        if (mx[tr][tc] === '#') {
          occupied++;
        }
      }
    }
  }
  return occupied;
}

function runTick2(mx) {
  const rows = mx.length,
    cols = mx[0].length;
  let outMx = makeMatrix(rows, cols, '.');
  for (let row = 0; row < rows; row++) {
    for (let col = 0 ; col < cols; col++) {
      newSeatStatus = mx[row][col];
      if (mx[row][col] !== '.') {
        const occupied = getOccupied2(mx, row, col);
        if (newSeatStatus === 'L' && !occupied) {
          newSeatStatus = '#';
        } else if (newSeatStatus === '#' && occupied >= 5) {
          newSeatStatus = 'L';
        }
      }
      outMx[row][col] = newSeatStatus;
    }
  }
  return outMx;
}

function getOccupied2(mx, row, col) {
  let occupied = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (!(i === 0 && j === 0)) {
        if (hasOccupied(mx, row, col, i, j)) {
          // console.log('>>', i, j);
          occupied++;
        }
      }
    }
  }
  // console.log('Count occupied =', occupied);
  return occupied;
}

function hasOccupied(mx, row, col, dr, dc) {
  // go along the beam
  // return true if any '#'
  // otherwise false
  const rows = mx.length,
    cols = mx[0].length;
  let currRow = row + dr,
    currCol = col + dc;
  while (currRow >= 0 && currCol >= 0
    && currRow < rows && currCol < cols) {
    if (mx[currRow][currCol] === '#') return true;
    if (mx[currRow][currCol] === 'L') return false;
    currRow += dr;
    currCol += dc;
  }
  return false;
}

function getChecksum(mx) {
  // console.log(matrix2lines(mx));
  return matrix2lines(mx);
}

function countOccupiedAll(mx) {
  return (matrix2lines(mx).match(/#/g) || []).length;
}

module.exports = { hasOccupied, getOccupied2, runTick, runTick2, getChecksum, countOccupiedAll };
