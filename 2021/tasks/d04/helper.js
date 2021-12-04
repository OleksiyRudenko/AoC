function find(needle, boards) {
  const findings = [];
  boards.forEach((board, bi) => {
    if (board === null) return;
    board.forEach((row, ri) => {
      row.forEach((number, ci) => {
        if (needle === number) {
          boards[bi][ri][ci] = -1;
          findings.push({
            n: needle,
            bi, ri, ci,
          });
        }
      })
    })
  });
  return findings;
}

function makeDrawBoards(n, dim) {
  return Array(n).fill(0).map(_ => ({
    rows: Array(dim).fill(0).map(_ => []),
    cols: Array(dim).fill(0).map(_ => []),
  }));
}

function insert(n, findings, drawBoards, successLength) {
  // inserts number into rows and cols of drawBoards
  // if any row or col length == successLength,
  // then return winning board index
  // else return null
  let result = [];

  /* if (n === 13) {
    console.log("--------------------------");
    console.log("Insert", n, findings);
    console.log("Inbound DrawBoards");
    drawBoards.forEach(db => console.log(db));
  } */
  findings.forEach(({bi, ri, ci}) => {
    // if (result !== null) return;
    /* if (n === 13) {
      console.log("Inserting", n, bi, ri, ci);
      console.log(drawBoards[bi].rows);
      console.log(drawBoards[bi].cols);
    } */
    drawBoards[bi].rows[ri].push(n);
    drawBoards[bi].cols[ci].push(n);
    if (drawBoards[bi].rows[ri].length === successLength ||
      drawBoards[bi].cols[ci].length === successLength) result.push(bi);
    /* if (n === 13) {
      console.log("Patched, and result board is", result);
      drawBoards.forEach(db => console.log(db));
    } */
  });
  /* if (n===13) {
    console.log("Patched DrawBoards");
    drawBoards.forEach(db => console.log(db));
    console.log("--------------------------");
  } */
  return result;
}

module.exports = { find, makeDrawBoards, insert, };
