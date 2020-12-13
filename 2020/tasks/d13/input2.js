const input = [
  `17,x,13,19`,
  `67,7,59,61`,
  `67,x,7,59,61`,
  `67,7,x,59,61`,
  `1789,37,47,1889`,
  `7,13,x,x,59,x,31,19`,
  `41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,541,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,983,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19`,
]
  .map(variant =>
    variant.split(",")
      .map(bus => bus === 'x' ? bus : +bus)
  );

module.exports = input;
