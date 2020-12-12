function iterateFerry([ferry, wp], command) {
  let [x, y, dir] = ferry;
  let [wpx, wpy] = wp;
  let [com, amount] = command;

  console.log('>>>>', com + amount);

  let wpxdir = getDirVector(wpx, 0);
  let wpydir = getDirVector(wpy, 0);
  console.log(ferry, wp, [wpxdir, wpydir]);

  switch (com) {
    case 'N': wpy += amount; break;
    case 'S': wpy -= amount; break;
    case 'E': wpx += amount; break;
    case 'W': wpx -= amount; break;
    case 'F':
      console.log(amount * Math.abs(wpx) * wpxdir, amount * Math.abs(wpy) * wpydir);
      x += amount * Math.abs(wpx) * wpxdir;
      y += amount * Math.abs(wpy) * wpydir;
      break;
    case 'R':
      [wpx, wpy] = rotateWp([wpx, wpy], [x, y], amount);
      break;
    case 'L':
      [wpx, wpy] = rotateWp([wpx, wpy], [x, y], -amount);
      break;
  }
  console.log([x, y], [wpx, wpy]);

  return [[x, y, dir], [wpx, wpy]];
}

function rotateWp(wp, center, amount, toBe) {
  let [wpx, wpy] = wp;
  const [cx, cy] = center;
  let turnTicks = amount / 90; // -1, 1, 2
  if (turnTicks < 0) turnTicks += 4; // -1 => 3
  let dx = wpx,
    dy = wpy;
  const vx = getDirVector(wpx, 0),
    vy = getDirVector(wpy, 0);
  const currentQuadrant =
    vx < 0
      ? (vy < 0 ? 2 : 3)
      : (vy < 0 ? 1 : 0);

  let newWpx, newWpy,
    newDx, newDy,
    newVx, newVy,
    nextQuadrant;
  switch (turnTicks) {
    case 3:
      newDx = Math.abs(dy);
      newDy = Math.abs(dx);
      nextQuadrant = (currentQuadrant + turnTicks) % 4;
      [newVx, newVy] = [
        [1, 1], [1, -1], [-1, -1], [-1, 1]
      ]
        [nextQuadrant];
      newWpx = Math.abs(newDx) * (newVx);
      newWpy = Math.abs(newDy) * (newVy);
      break;
    case 1:
      newDx = Math.abs(dy);
      newDy = Math.abs(dx);
      nextQuadrant = (currentQuadrant + turnTicks) % 4;
      [newVx, newVy] = [
        [1, 1], [1, -1], [-1, -1], [-1, 1]
      ]
        [nextQuadrant];
      newWpx = Math.abs(newDx) * (newVx);
      newWpy = Math.abs(newDy) * (newVy);
      break;
    case 2: // flip
      newWpx = Math.abs(dx) * vx * -1;
      newWpy = Math.abs(dy) * vy * -1;
      break;
    default: throw new Error('rotateWp: bad ticks count');
  }

  console.log('CENTER', [cx, cy], `Rotate`, turnTicks);
  console.log('  DELTAS', [dx, dy], 'VECTORS', [vx, vy]);
  console.log('  WP', [wpx, wpy],
    '=>', [newWpx, newWpy],
    'vs', toBe ? toBe : '',
    '===', toBe ? [toBe[0] - newWpx, toBe[1] - newWpy] : '');

  return [newWpx, newWpy];
}

function getDirVector(target, source) {
  let diff = target - source;
  if (diff < 0) diff = -1;
  if (diff > 0) diff = 1;
  return diff;
}

/* console.log('TEST ROTATIONS');
let angle;

angle = 90;
console.log('>>>>', angle);
rotateWp([0, 5], [0,0], angle, [5, 0]);
rotateWp([5, 0], [0,0], angle, [0, -5]);
rotateWp([4, 5], [0,0], angle, [5, -4]);
console.log('>>>>', angle);
rotateWp([-5, 0], [0,0], angle, [0, 5]);
rotateWp([0, -5], [0,0], angle, [-5, 0]);
rotateWp([-4, -5], [0,0], angle, [-5, 4]);
console.log('>>>>', angle);
rotateWp([-5, 2], [0,0], angle, [2, 5]);
rotateWp([2, -5], [0,0], angle, [-5, -2]);

angle = -90;
console.log('>>>>', angle);
rotateWp([0, 5], [0,0], angle, [-5, 0]);
rotateWp([5, 0], [0,0], angle, [0, 5]);
rotateWp([4, 5], [0,0], angle, [-5, 4]);
console.log('>>>>', angle);
rotateWp([-5, 0], [0,0], angle, [0, -5]);
rotateWp([0, -5], [0,0], angle, [5, 0]);
rotateWp([-4, -5], [0,0], angle, [5, -4]);
console.log('>>>>', angle);
rotateWp([-5, 2], [0,0], angle, [-2, -5]);
rotateWp([2, -5], [0,0], angle, [5, 2]);
*/

/* angle = 180;
console.log('>>>>', 180);
rotateWp([5, 0], [0,0], 180);
rotateWp([0, 5], [0,0], 180);
rotateWp([4, 5], [0,0], 180);
console.log('>>>>', 180);
rotateWp([-5, 0], [0,0], 180);
rotateWp([0, -5], [0,0], 180);
rotateWp([-4, -5], [0,0], 180);
console.log('>>>>', 180);
rotateWp([-5, 2], [0,0], 180);
rotateWp([2, -5], [0,0], 180);
*/

console.log('<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>');
module.exports = { iterateFerry };
