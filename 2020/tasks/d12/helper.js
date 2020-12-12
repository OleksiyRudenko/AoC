function iterateFerry(pos, command) {
  let [x, y, dir] = pos;
  let [com, amount] = command;

  if (com === 'F') com = dir;

  switch (com) {
    case 'N': y += amount; break;
    case 'E': x += amount; break;
    case 'W': x -= amount; break;
    case 'S': y -= amount; break;
    case 'R': dir = rotateFerry(dir, amount); break;
    case 'L': dir = rotateFerry(dir, -amount); break;
  }
  return [x, y, dir];
}

function rotateFerry(dir, angle) {
  const inc = angle / 90;
  const dirs = ['E', 'S', 'W', 'N'];
  const curr = dirs.findIndex(d => d === dir) + inc;
  let next;
  for (next = curr; next < 0; next = dirs.length + next);
  const nextDir = dirs[next % dirs.length];
  console.log('ROTATE', dir, angle, nextDir);
  return nextDir;
}

module.exports = { iterateFerry };
