const M = require("./TBD/tools");
let moons =
  /* `x=-1, y=0, z=2>
x=2, y=-10, z=-7>
x=4, y=-8, z=8>
x=3, y=5, z=-1>` */
  /* `x=-8, y=-10, z=0>
x=5, y=5, z=10>
x=2, y=-7, z=3>
x=9, y=-8, z=-3` */
  `x=-1, y=7, z=3>
x=12, y=2, z=-13>
x=14, y=18, z=-8>
x=17, y=4, z=-4>`
  .split("\n")
  .map(s => s.match(/[-0-9]+/g).map(e=>+e))
  .map(e => ({
    c: e,
    v: [0,0,0],
  }));

console.log('INITIAL', moons);

const periods = findXYZperiods(moons);
console.log("ANSWER 12-2: ", M.lcm(periods), '=', 'LCM for', periods);

function findXYZperiods(moonsSource) {
  const moons = cloneMoons(moonsSource);
  const periods = new Array(3).fill(0);
  const initialStates = [0,1,2]
    .map(xyz => moons.map(m => m.c[xyz] + ',' + m.v[xyz]).join(';'));
  console.log('INITIAL STATES', initialStates);
  for (let step = 1; true; step++) {
    progressMoons(moons);
    const newStates = [0,1,2]
      .map(xyz => moons.map(m => m.c[xyz] + ',' + m.v[xyz]).join(';'));
    periods.forEach((p, i) => {
      if (!p) {
        if (newStates[i] === initialStates[i]) {
          periods[i] = step;
          console.log('PERIOD FOUND:', 'dim', i, 'state', newStates[i], '@', periods[i]);
        }
      }
    });
    const allFound = periods.reduce((acc, p) => p ? acc : false, true);
    if (allFound) {
      return periods;
    }
    if (step % 100000 === 0) {
      console.log('PASSED STEP', step);
    }
  }
}

function progressMoons(moons) {
  const pairs = [ [0,1], [0,2], [0,3], [1,2], [1,3], [2,3] ];
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

function cloneMoons(moons) {
  return moons.map(m => ({...m}));
}
