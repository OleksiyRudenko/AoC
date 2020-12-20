function maprow2binaries(maprow) {
  maprow = [...maprow].map(e => e === '.' ? 0 : 1);
  const maprowr = [...maprow].reverse();
  // console.log(">>>", maprow);
  let res = [
    maprow,
    maprowr,
  ]
    // .map(r => r.join(''));
    .map(r => parseInt(r.join(''), 2));
  // console.log(res);
  return res;
}

function isPairEq(pair1, pair2) {
  if (!pair1 || !pair2)
    return false;
  if (pair1[0] === pair2[0] && pair1[1] === pair2[1])
    return true;
  if (pair1[0] === pair2[1] && pair1[1] === pair2[0])
    return true;
  return false;
}

function purgeArray(a) {
  return a.reduce((a, e) => {
    a.push(e);
    return a;
  }, []);
}

function getBorder(tile, borderIdx) {
  switch (borderIdx) {
    case 0: return tile[0];
    case 1: return tile.map(r => r[9]).join('');
    case 2: return tile[9];
    case 3: return tile.map(r => r[0]).join('');
  }
}

function rotate(tile) {
  // console.log('ROTATE');
  // console.log(tile);
  const dim = tile.length;
  const newTile = new Array(dim)
    .fill(0).map(() => []);
  tile.forEach((row, r) => {
    [...row].forEach((char, c) => {
      newTile[c][dim - 1 - r] = char;
    });
  });
  newTile.forEach((row, i) => {
    newTile[i] = row.join('');
  })
  return newTile;
}

function flip(tile) {
  return tile.reverse();
}

module.exports = { maprow2binaries, isPairEq, purgeArray, getBorder, flip, rotate };
