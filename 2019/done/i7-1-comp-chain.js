let prg =
  `3,8,1001,8,10,8,105,1,0,0,21,30,47,64,81,98,179,260,341,422,99999,3,9,1001,9,5,9,4,9,99,3,9,1002,9,5,9,101,4,9,9,102,2,9,9,4,9,99,3,9,102,3,9,9,101,2,9,9,1002,9,3,9,4,9,99,3,9,1001,9,5,9,1002,9,3,9,1001,9,3,9,4,9,99,3,9,1002,9,3,9,101,2,9,9,102,5,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,99`
  // `3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0`
  // `3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0`
  // `3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0`
  .split(",").map(e => +e);

const recombinations = [];
  // [
  // [4,3,2,1,0],
  // [0,1,2,3,4],
  // [1,0,4,3,2]
  // ];
makeRecombinations(recombinations, [], [0,1,2,3,4], 5);
const powers = [];

recombinations.forEach(phaseSettings => {
  let prevStageOutput = 0;
  phaseSettings.forEach(phaseValue => {
    const result = compute([...prg], [phaseValue, prevStageOutput], false);
    prevStageOutput = result[0];
  });
  console.log('Stage results', phaseSettings, prevStageOutput);
  powers.push(prevStageOutput);
});

const maxPower = powers.reduce((acc, v) => v > acc ? v : acc);
console.log(maxPower);

// const output = compute([...prg], 5);
// console.log(output);

function compute(prg, input, debug = false) {
  let ptr = 0;
  const output = [];
  if (!Array.isArray(input)) {
    input = [input];
  }
  debug && console.log('INPUT', input);
  try {
    while (true) {
      let instruction = (prg[ptr]+'').padStart(5,'0');
      let cmd = instruction.slice(-2);
      // params modes
      let pm = instruction.split('').slice(0,3).reverse().map(e => +e);
      pm.unshift('');
      const seq = prg.slice(ptr, ptr+4);
      debug && console.log(ptr, cmd, pm, seq);
      switch (cmd) {
        case '99': // exit
          debug && console.log('DONE -- SEE LATEST OUTPUT');
          throw new Error('Exit with PRG[0] = ' + prg[0]);
        case '01': // [3] = [1] + [2]
          prg[prg[ptr+3]] =
            prg[pm[1] ? ptr+1 : prg[ptr+1]] +
            prg[pm[2] ? ptr+2 : prg[ptr+2]];
          ptr+=4;
          break;
        case '02': // [3] = [1] * [2]
          prg[prg[ptr+3]] =
            prg[pm[1] ? ptr+1 : prg[ptr+1]] *
            prg[pm[2] ? ptr+2 : prg[ptr+2]];
          ptr+=4;
          break;
        case '03': // [1] = user input
          prg[prg[ptr+1]] = input.shift();
          debug && console.log('USED INPUT', prg[prg[ptr+1]]);
          if (prg[prg[ptr+1]] === undefined) {
            throw new Error('BAD INPUT (undefined)');
          }
          ptr+=2;
          break;
        case '04': // print [1]
          const result = prg[pm[1] ? ptr+1 : prg[ptr+1]];
          output.push(result);
          debug && console.log('04 - OUTPUT', result);
          ptr+=2;
          break;
        case '05': // if [1] == true jump [2]
          if (prg[pm[1] ? ptr+1 : prg[ptr+1]])
            ptr = prg[pm[2] ? ptr+2 : prg[ptr+2]];
          else
            ptr+=3;
          break;
        case '06': // if [1] == false jump [2]
          if (!prg[pm[1] ? ptr+1 : prg[ptr+1]])
            ptr = prg[pm[2] ? ptr+2 : prg[ptr+2]];
          else
            ptr+=3;
          break;
        case '07': // [3] = [1] < [2] ? 1 : 0
          prg[prg[ptr+3]] =
            (prg[pm[1] ? ptr+1 : prg[ptr+1]] < prg[pm[2] ? ptr+2 : prg[ptr+2]]) ? 1 : 0;
          ptr+=4;
          break;
        case '08': // [3] = [1] === [2] ? 1 : 0
          prg[prg[ptr+3]] =
            (prg[pm[1] ? ptr+1 : prg[ptr+1]] === prg[pm[2] ? ptr+2 : prg[ptr+2]]) ? 1 : 0;
          ptr+=4;
          break;
      }
    }
  } catch (e) {
    console.log(e.message);
    return output;
  }
}

function makeRecombinations(finalAcc, acc, rest, n) {
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
