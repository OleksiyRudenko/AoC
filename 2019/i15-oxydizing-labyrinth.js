const VM = require("./TBD/vm");

let prg = `3,1033,1008,1033,1,1032,1005,1032,31,1008,1033,2,1032,1005,1032,58,1008,1033,3,1032,1005,1032,81,1008,1033,4,1032,1005,1032,104,99,1001,1034,0,1039,102,1,1036,1041,1001,1035,-1,1040,1008,1038,0,1043,102,-1,1043,1032,1,1037,1032,1042,1105,1,124,1001,1034,0,1039,1001,1036,0,1041,1001,1035,1,1040,1008,1038,0,1043,1,1037,1038,1042,1106,0,124,1001,1034,-1,1039,1008,1036,0,1041,101,0,1035,1040,101,0,1038,1043,1001,1037,0,1042,1105,1,124,1001,1034,1,1039,1008,1036,0,1041,102,1,1035,1040,102,1,1038,1043,102,1,1037,1042,1006,1039,217,1006,1040,217,1008,1039,40,1032,1005,1032,217,1008,1040,40,1032,1005,1032,217,1008,1039,39,1032,1006,1032,165,1008,1040,1,1032,1006,1032,165,1102,1,2,1044,1105,1,224,2,1041,1043,1032,1006,1032,179,1101,1,0,1044,1105,1,224,1,1041,1043,1032,1006,1032,217,1,1042,1043,1032,1001,1032,-1,1032,1002,1032,39,1032,1,1032,1039,1032,101,-1,1032,1032,101,252,1032,211,1007,0,53,1044,1105,1,224,1101,0,0,1044,1105,1,224,1006,1044,247,1002,1039,1,1034,1002,1040,1,1035,1001,1041,0,1036,1002,1043,1,1038,102,1,1042,1037,4,1044,1106,0,0,75,19,3,12,33,54,92,8,21,31,54,5,92,12,60,36,59,17,50,64,6,67,13,45,33,33,6,76,60,41,97,33,8,19,78,23,28,64,22,49,25,77,58,85,19,83,48,69,66,27,18,23,60,25,13,52,71,49,88,74,21,93,89,22,60,89,12,78,8,17,98,68,14,29,57,90,31,57,13,2,48,60,18,17,80,6,96,37,55,99,44,64,67,79,27,61,96,36,97,47,48,82,96,19,19,99,35,78,41,90,21,6,87,86,6,44,49,14,88,79,42,65,73,96,8,3,13,17,80,68,35,21,54,71,49,2,48,4,95,83,24,43,74,24,70,37,47,98,92,47,76,42,39,94,86,1,64,47,83,11,71,21,90,44,58,95,67,28,23,58,58,39,52,82,18,95,83,4,91,22,91,59,32,75,64,51,99,19,79,74,22,65,34,28,77,37,13,67,18,63,16,73,33,72,20,97,41,83,26,64,81,42,75,97,36,59,25,45,75,2,47,88,98,48,52,67,6,72,24,56,96,65,19,37,10,83,91,15,86,25,16,46,45,90,31,76,18,49,82,49,99,91,49,7,33,55,94,23,13,92,27,19,96,65,26,50,90,2,79,19,28,90,5,60,15,84,33,85,9,69,84,77,34,39,54,64,8,6,79,85,17,78,69,99,49,64,8,86,72,10,80,10,97,38,6,42,79,84,12,70,75,12,45,6,9,62,45,90,46,39,67,44,92,56,29,96,94,38,40,66,8,4,27,66,34,40,59,38,99,97,48,45,89,72,62,47,73,51,43,90,10,11,55,69,36,99,86,46,90,20,20,43,1,32,70,20,24,31,63,15,90,74,51,97,60,94,17,30,76,57,7,25,75,9,20,8,75,11,84,10,31,71,46,34,83,7,76,68,74,75,14,63,76,54,26,79,71,67,67,14,93,69,46,32,21,21,91,2,48,84,36,88,2,80,34,75,57,47,74,19,74,47,56,11,29,81,28,23,98,7,57,50,21,88,85,33,46,40,24,17,60,79,80,22,79,72,38,80,92,90,52,88,79,80,43,5,65,47,27,92,94,7,84,97,9,44,68,61,12,60,54,51,6,54,30,64,20,75,68,10,54,52,54,92,1,43,78,41,98,42,83,7,7,77,55,44,14,24,97,15,48,35,63,4,91,54,22,69,26,47,56,35,74,34,82,61,7,68,41,32,72,19,36,70,68,21,44,78,18,40,63,63,34,93,16,87,45,52,99,81,49,77,21,98,12,35,9,62,25,64,59,36,76,82,86,44,37,96,79,38,62,89,14,35,56,3,72,68,81,30,9,44,43,31,37,90,55,29,15,62,65,85,13,76,59,99,9,26,75,82,43,72,3,41,12,92,32,45,84,14,36,54,68,3,91,23,41,6,98,18,58,33,94,30,23,27,23,70,48,25,68,35,57,51,96,28,92,94,8,38,59,48,67,93,4,45,66,91,41,72,61,17,20,83,36,90,51,58,62,90,37,72,26,3,58,66,88,19,77,97,41,82,37,67,35,11,75,15,45,92,38,10,86,17,83,60,48,43,45,72,29,60,74,45,97,96,14,62,13,90,81,51,12,47,91,34,65,60,31,30,92,46,18,64,85,22,77,94,42,32,68,80,94,47,1,81,98,88,31,12,54,20,96,90,31,9,99,50,70,51,83,68,40,99,26,65,19,66,93,68,49,92,36,96,6,66,48,95,57,76,14,85,12,98,32,61,36,71,58,72,15,74,19,90,49,69,7,58,18,57,0,0,21,21,1,10,1,0,0,0,0,0,0`
  .split(",").map(e=>+e);

const vm = new VM("R", prg);
const dirTargetOffset = [
  undefined,
  [0, 1],  // 1: north
  [0, -1], // 2: south
  [-1, 0], // 3: west
  [1, 0],  // 4: east
];
const dirTurn = [ // [dirWhenTurnLeft==counterClockWise, dirWhenTurnRight==clockWise]
  undefined,
  [3, 4],
  [4, 3],
  [2, 1],
  [1, 2],
];
const robot = {
  l: [0, 0],
  dir: 1,
  path: ['0,0'],
};
const map = [];
mapSet(robot.l, '.');
let wallHit = false;
drawMap(map, robot.l);

for (let i = 0; true; i++) {
  if (wallHit) {
    robot.dir = nextDir(robot.dir, 0);
  } else {
    robot.dir = nextDir(robot.dir, 1);
  }
  const target = nextLocation(robot.l, robot.dir);
  const result = vm.run(robot.dir);
  // console.log('STEP', robot.l, robot.dir, target, result[0]);
  if (result[0]) {
    mapSet(target, '.');
    wallHit = false;
    robot.l = [...target];

    // cut the loops
    const newLoc = target.join(',');
    const beenHere = robot.path.indexOf(newLoc);
    if (beenHere === -1) {
      robot.path.push(newLoc);
    } else {
      robot.path.length = beenHere + 1;
    }

    if (result[0] === 2) {
      // mapSet(target, '!');
      console.log('FOUND!');
      break;
    }
  } else {
    mapSet(target, '#');
    wallHit = true;
  }
  // drawMap(map, robot.l);
}

drawMap(map, robot.l);
console.log(robot);
console.log("ANSWER 15-1", robot.path.length - 1);
const oxygenSourceLocation = [...robot.l];

// ===== PART 2 ============

// investigate entire map
for (let i = 0; true; i++) {
  if (wallHit) {
    robot.dir = nextDir(robot.dir, 0);
  } else {
    robot.dir = nextDir(robot.dir, 1);
  }
  const target = nextLocation(robot.l, robot.dir);
  const result = vm.run(robot.dir);
  // console.log('STEP', robot.l, robot.dir, target, result[0]);
  if (result[0]) {
    mapSet(target, '.');
    wallHit = false;
    robot.l = [...target];

    // cut the loops
    const newLoc = target.join(',');
    const beenHere = robot.path.indexOf(newLoc);
    if (beenHere === -1) {
      robot.path.push(newLoc);
    } else {
      robot.path.length = beenHere + 1;
    }

    if (robot.path.length === 1) {
      // mapSet(target, '!');
      console.log('BACK TO THE START');
      break;
    }
  } else {
    mapSet(target, '#');
    wallHit = true;
  }
  // drawMap(map, robot.l);
}
const {canvas, offs} = drawMap(map, robot.l, false);

console.log('PART 2');
const epicenter = [offs[0] + oxygenSourceLocation[0], offs[1] + oxygenSourceLocation[1]];

canvas[epicenter[1]][epicenter[0]] = 'O';
drawCanvas(canvas);

let sources = [epicenter];
let minutes = 0;

let newSources = [];

while (sources.length > 0) {
  newSources = [];
  sources.forEach(source => {
    // generate new sources
    const targets = [
      [source[0], source[1] - 1], // above
      [source[0], source[1] + 1], // below
      [source[0]-1, source[1]], // to the left
      [source[0]+1, source[1]], // to the right
    ];
    targets.forEach(target => {
      if (canvas[target[1]][target[0]] === '.') {
        canvas[target[1]][target[0]] = 'O';
        newSources.push(target);
      }
    });
  });
  minutes++;
  sources = newSources;
}
console.log('OXYDIZE');
drawCanvas(canvas);
console.log('ANSWER 15-2', minutes - 1);

// ====================================================

function nextLocation(loc, dir) { // [x,y], dir
  return [loc[0] + dirTargetOffset[dir][0], loc[1] + dirTargetOffset[dir][1]];
}

function nextDir(dir, turn = 0) { // dir, turn 0|-1 left, 1 right
  const next = turn > 0 ? 1 : 0;
  return dirTurn[dir][next];
}

function mapSet(loc, value) {
  map[loc.join(',')] = value;
}

function mapGet(loc) {
  return map[loc.join(',')];
}

function drawMap(map, actorLocation, drawSpecials = true) {
  console.log('=== MAP ===');
  const locs = Object.keys(map).map(k => k.split(',').map(v=>+v));
  const dims = locs.reduce((dims, loc) => {
    if (loc[0] < dims[0]) dims[0] = loc[0];
    if (loc[0] > dims[2]) dims[2] = loc[0];
    if (loc[1] < dims[1]) dims[1] = loc[1];
    if (loc[1] > dims[3]) dims[3] = loc[1];
    return dims;
  }, [0,0,0,0]);
  const [w, h] = [dims[2] - dims[0] + 1, dims[3] - dims[1] + 1];
  const [offsX, offsY] = [-dims[0], -dims[1]];
  // console.log(locs, dims, w, h, offsX, offsY);
  const canvas = new Array(h);
  for (let r = 0; r < h; r++) {
    canvas[r] = new Array(w).fill(' ');
  }
  locs.forEach(l => {
    canvas[l[1] + offsY][l[0] + offsX] = map[l.join(',')];
  });
  if (drawSpecials) canvas[offsY][offsX] = 'x';
  if (drawSpecials) canvas[actorLocation[1] + offsY][actorLocation[0] + offsX] = '@';
  drawCanvas(canvas);

  // console.log(map, locs);
  return {
    canvas,
    offs: [offsX, offsY],
  };
}

function drawCanvas(canvas) {
  canvas.forEach(row => {
    console.log(row.join(''));
  });
}
