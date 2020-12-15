const input = [
  `0,3,6`, // 436
  `1,3,2`, // 1
  `2,1,3`, // 10
  `1,2,3`, // 27
  `2,3,1`, // 78
  `3,2,1`, // 438
  `3,1,2`, // 1836
  `2,0,1,9,5,19`,
]
  .map(variant =>
    variant.split(",")
      .map(s => +s)
  );

module.exports = input;
