function isNotCompaundable(number, compounds) {
  compounds = compounds.sort((a, b) => a-b);
  const compoundsLength = compounds.length;
  // console.log(">>", number, compounds.length, compounds);
  for (let i = 0; i < compoundsLength - 1; i++) {
    for (let j = i+1; j < compoundsLength; j++) {
      // console.log(compounds[i], compounds[j], compounds[i] + compounds[j]);
      if (compounds[i] + compounds[j] === number) {
        // console.log('OK with', compounds[i], compounds[j]);
        return false;
      }
    }
  }
  // console.log("--- FAIL", number);
  return number;
}

function findCompoundsRange(needle, sequence) {
  const sequenceLength = sequence.length;
  for (let i = 0; i < sequenceLength - 1; i++) {
    let sum = sequence[i];
    for (let j = i+1; j < sequenceLength; j++) {
      sum += sequence[j];
      if (sum === needle) {
        // console.log('FOUND with', sequence[i], sequence[j]);
        return sequence.slice(i, j + 1);
      }
      if (sum > needle) {
        break;
      }
    }
  }
  return [];
}

module.exports = { isNotCompaundable, findCompoundsRange };
