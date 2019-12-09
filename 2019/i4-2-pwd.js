let src = `382345-843167`
  .split("-")
  .map(e => +e);

let count = 0;
for (let i=src[0]; i <= src[1]; i++) {
  count += validate(i+'');
}

console.log(count);

function validate(s) {
  let sa = Array.from(s);
  let curr = sa[0];
  let seqCount = 1;
  let seq = [];
  for (let i = 1; i < s.length; i++) {
    if (sa[i] < curr) return 0;
    if (sa[i] === curr) {
      seqCount++;
    } else {
      if (seqCount > 1) {
        seq.push(seqCount)
      }
      seqCount = 1;
    }
    curr = sa[i];
  }
  if (seqCount > 1) seq.push(seqCount);

  const anyPairs = seq.filter(e => e === 2).length;
  if (anyPairs) {
    console.log(s, anyPairs);
    return 1;
  }
  return 0;
}
