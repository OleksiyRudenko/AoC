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
  let pair = false;
  let curr = sa[0];
  for (let i = 1; i < s.length; i++) {
    if (sa[i] < curr) return 0;
    if (sa[i] === curr) pair = true;
    curr = sa[i];
  }
  return pair ? 1 : 0;
}
