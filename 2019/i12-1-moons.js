let moons =
  /* `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>` */
  `<x=-1, y=7, z=3>
<x=12, y=2, z=-13>
<x=14, y=18, z=-8>
<x=17, y=4, z=-4>`
  .split("\n")
  .map(s => s.match(/[-0-9]+/g).map(e=>+e))
  .map(e => ({
    c: e,
    v: [0,0,0],
  }));

const pairs = [ [0,1], [0,2], [0,3], [1,2], [1,3], [2,3] ];

console.log('INITIAL', moons);

for (let step = 0; step < 1000; step++) {
  // adjust velocities
  pairs.forEach(pairIdx => {
    const m = pairIdx.map(i => moons[i]);
    for (let i=0; i<3; i++) {
      let vd = 0;
      if (m[0].c[i] < m[1].c[i]) vd = 1;
      if (m[0].c[i] > m[1].c[i]) vd = -1;
      m[0].v[i] += vd;
      m[1].v[i] -= vd;
    }
  });

// apply velocities
  moons.forEach(m => {
    m.c = m.c.map((c, idx) => c + m.v[idx]);
  });
}

const energy = moons
  .map(m => {
    const pot = m.c.reduce((acc, c) => acc + Math.abs(c), 0);
    const kin = m.v.reduce((acc, v) => acc + Math.abs(v), 0);
    return pot * kin;
  })
  .reduce((sum, e) => sum + e, 0);

console.log('ANSWER 12-1', energy);
