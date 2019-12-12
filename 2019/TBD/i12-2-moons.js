let moons =
  /* `x=-1, y=0, z=2>
x=2, y=-10, z=-7>
x=4, y=-8, z=8>
x=3, y=5, z=-1>` */
  `x=-8, y=-10, z=0>
x=5, y=5, z=10>
x=2, y=-7, z=3>
x=9, y=-8, z=-3`
  /* `x=-1, y=7, z=3>
x=12, y=2, z=-13>
x=14, y=18, z=-8>
x=17, y=4, z=-4>` */
  .split("\n")
  .map(s => s.match(/[-0-9]+/g).map(e=>+e))
  .map((e, idx) => ({
    id: idx,
    c: e,
    v: [0,0,0],
  }))
  .map(m => ({
    ...m,
    s: new Set([m.c.join('') + m.v.join('')]),
    period: undefined,
    periodChange: 0,
    iveBeenHere: false,
  }));

const systemState = new Set([moons.reduce((acc, m) => acc + makeState(m), '')]);

const pairs = [ [0,1], [0,2], [0,3], [1,2], [1,3], [2,3] ];

console.log('INITIAL', moons);

function run() {
  for (let step = 0; true; step++) {
    let returns = 0; // # of moons been here
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
      const newState = makeState(m);
      if (m.s.has(newState)) {
        returns++;
      } else {
        m.s.add(newState);
      }
    });

    const newState = moons.reduce((acc, m) => acc + makeState(m), '');
    if (systemState.has(newState)) {
      return step;
    }
    if (returns === 4)
      systemState.add(newState);
    if (step % 100000 === 0) {
      console.log(step, systemState.size, moons.map(m => m.s.size));
    }
  }
}

console.log('ANSWER 12-2', run() + 1);

function makeState(moon) {
  return moon.c.join('') + moon.v.join('')
}
