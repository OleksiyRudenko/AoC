const gcd = (a, b) => {
  [a, b] = [Math.abs(a), Math.abs(b)];
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
};

const lcm = (...numbers) => {
  numbers = numbers.flat();
  let lcm = numbers[0];
  for (let i = numbers.length - 1; i > 0; i--) {
    lcm = lcm * (numbers[i] / gcd(lcm, numbers[i]));
  }
  return lcm;
};

const sum = (a, b) => a + b;
const sort09 = (a, b) => a - b;
const max = (max, v) => v > max ? v : max;
const min = (min, v) => v < min ? v : min;

const makeMatrix = (rows, cols, fill = undefined) => {
  const mx = [];
  for (let r = 0; r < rows; r++) {
    const row = new Array(cols);
    if (fill !== undefined) {
      row.fill(fill);
    }
    mx.push(row);
  }
  return mx;
};

const matrix2lines = mx => mx.map(row => row.join('')).join("\n");

const cloneMatrix = mx => {
  const clone = [];
  mx.forEach(row => {
    clone.push([...row]);
  });
  return clone;
};

const makeRecombinations = (finalAcc, interimAcc, rest, n) => {
  if (n) {
    for (let i = 0; i < rest.length; i++) {
      const others = [...rest];
      others.splice(i, 1);
      makeRecombinations(finalAcc, [...acc, rest[i]], others, n-1);
    }
  } else {
    finalAcc.push(acc);
  }
}

const ruler = (char = '=', count = 80) => char.repeat(count);

module.exports = {
  gcd,
  lcm,
  sum,
  sort09,
  max,
  min,
  makeMatrix,
  matrix2lines,
  cloneMatrix,
  makeRecombinations,
  ruler,
};
