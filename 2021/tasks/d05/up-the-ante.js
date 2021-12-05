const INPUT = require("./input")[2];
const max = Math.max;
const min = Math.min;

// consider geometrical approach
// https://github.com/pgkelley4/line-segments-intersect/blob/master/js/line-segments-intersect.js

const getIntersections = (l1, l2) => {
  // do lines intersect?
  // are lines collinear? => [...intersection of vectors]
  // are lines horizontal x vertical? => [integer intersection point]
  // are lines parallel? => []
  // where they intersect? => [intersection point if integer]

  const [[x1, y1], [x2, y2]] = l1;
  const [[x3, y3], [x4, y4]] = l2;

  if (x3 > max(x1, x2) && x4 > max(x1, x2)) return [];
  if (x3 < min(x1, x2) && x4 < min(x1, x2)) return [];
  if (y3 > max(y1, y2) && y4 > max(y1, y2)) return [];
  if (y3 < min(y1, y2) && y4 < min(y1, y2)) return [];
  // parallel ones excluded
  // there still can be vectors that do not intersect


}
