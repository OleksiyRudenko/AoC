const input = [
  `5764801
17807724`,
  `19241437
17346587`,
]
  .map(variant =>
    variant.split("\n").map(v => +v)
  );

module.exports = input;
