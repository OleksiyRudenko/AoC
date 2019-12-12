function gcd(a, b) {
  [a, b] = [Math.abs(a), Math.abs(b)];
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(...numbers) {
  numbers = numbers.flat();
  const l = numbers.length;
  let lcm = numbers[0];
  for (let i = 1; i < l; i++) {
    lcm = lcm * (numbers[i] / gcd(lcm, numbers[i]));
  }
  return lcm;
}

module.exports ={
  gcd,
  lcm,
};
