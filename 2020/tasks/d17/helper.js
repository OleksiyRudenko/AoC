const offs = 100;

const offset = {
  x: offs,
  y: offs,
  z: offs,
  w: offs,
};

const groupl = (offs + '').length;

function xyz2XYZ(x, y, z, w = 0) {
  let coord = [x, y, z, w];
  return coord
    .reduce((hash, v) =>
      hash + (v+'').padStart(groupl, '0'),
      '');
}

function XYZ2xyz(hash) {
  const xyz = [];
  const groups = hash.length / groupl;
  for (let i = 0; i < groups; i++) {
    xyz[i] = +hash.slice(i*groupl, i*groupl + groupl);
  }
  return xyz;
}

module.exports = { offset, xyz2XYZ, XYZ2xyz };
