function distill(sequence, lower) {
  const max = 2 ** sequence.length;
  // console.log(sequence, max);
  sequence = [...sequence].map(e => e === lower ? 0 : 1);
  // console.log(sequence);
  const range = sequence.reduce((range, trigger) => {
      const newRange = !trigger
        ? [range[0], range[0] + (range[1] - range[0]) / 2]
        : [range[0] + (range[1] - range[0]) / 2, range[1]];
      // console.log(trigger, range, newRange);
      return newRange;
    },
    [0, max]);
  // console.log(range);
  return range[0];
}


function getSeatId(row, column) {
  return row * 8 + column;
}

module.exports = {
  distill,
  getSeatId,
}
