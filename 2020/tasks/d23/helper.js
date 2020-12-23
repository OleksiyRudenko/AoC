function list2array(list, triplet = [], limit = -1) {
  let v = 1;
  while (triplet.includes(v)) v++;
  const res = [];

  let end = list.length - triplet.length;
  if (limit > 0) end = limit + 1;

  for (let i = 1; i < end; i++) {
    res.push(v);
    v = list[v];
  }
  return res;
}

module.exports = { list2array };
