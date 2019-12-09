class VM {
  constructor(name, initialPrg, initialInput, unconsumedOutput, debug = false) {
    this.name = name;
    this.prg = [...initialPrg];
    this.input = Array.isArray(initialInput) ? initialInput : [initialInput];
    this.unconsumedOutput = unconsumedOutput;
    this.debug = debug;
    this.ptr = 0;
    this.state = 'suspended'; // running | suspended | halted
    this.nextVM = null;
    this.output = [];
  }
  setNextVM(nextVM) { this.nextVM = nextVM; }
  useSignal(input) {
    if (!Array.isArray(input)) input = [input];
    this.input = [...this.input, ...input];
    this.debug && console.log(this.name, 'RESUMED with signal', input, 'input queue', this.input);
    return this.run();
  }
  run() {
    const prg = this.prg;
    this.debug && console.log(this.name, 'INPUT', this.input);
    try {
      while (true) {
        if (this.state === 'halted') {
          console.log(this.name, 'is halted. Input is', this.input);
          return this.input;
        }
        this.state = 'running';
        const instruction = (this.prg[this.ptr]+'').padStart(5,'0');
        const cmd = instruction.slice(-2);
        // params modes
        const pm = instruction.split('').slice(0,3).reverse().map(e => +e);
        pm.unshift('');
        const seq = this.prg.slice(this.ptr, this.ptr+4);
        this.debug && console.log(this.name, this.ptr, cmd, pm, seq);
        switch (cmd) {
          case '99': // exit
            console.log(this.name, 'Exit with PRG[0] = ', prg[0], 'output', this.output);
            this.state = 'halted';
            if (this.nextVM && this.nextVM.state !== 'halted') {
              const signal = [...this.output];
              this.output = [];
              this.nextVM.useSignal(signal);
            }
            if (this.output.length) {
              this.unconsumedOutput.push(this.output);
            }
            throw new Error(this.name + ': Exited with unconsumed output signal ' + this.output.join(","));
          case '01': // [3] = [1] + [2]
            this.prg[prg[this.ptr+3]] =
              prg[pm[1] ? this.ptr+1 : prg[this.ptr+1]] +
              prg[pm[2] ? this.ptr+2 : prg[this.ptr+2]];
            this.ptr+=4;
            break;
          case '02': // [3] = [1] * [2]
            this.prg[prg[this.ptr+3]] =
              prg[pm[1] ? this.ptr+1 : prg[this.ptr+1]] *
              prg[pm[2] ? this.ptr+2 : prg[this.ptr+2]];
            this.ptr+=4;
            break;
          case '03': // [1] = user input
            if (this.input.length) {
              this.prg[prg[this.ptr+1]] = this.input.shift();
              this.debug && console.log(this.name, 'USED INPUT', prg[prg[this.ptr+1]], 'Remaining', this.input);
              if (prg[prg[this.ptr+1]] === undefined) {
                throw new Error(this.name + ': BAD INPUT (undefined)');
              }
              this.ptr+=2;
            } else {
              this.state = 'suspended';
              this.debug && console.log(this.name, '03 - SUSPENDED');
              const signal = [...this.output];
              this.output = [];
              if (!this.nextVM) {
                console.log(this.name, '03 - NO NEXT VM');
              }
              this.nextVM && this.nextVM.useSignal(signal);
            }
            break;
          case '04': // print [1]
            const result = prg[pm[1] ? this.ptr+1 : prg[this.ptr+1]];
            this.output.push(result);
            this.debug && console.log(this.name, '04 - OUTPUT', result);
            this.ptr+=2;
            break;
          case '05': // if [1] == true jump [2]
            if (prg[pm[1] ? this.ptr+1 : prg[this.ptr+1]])
              this.ptr = prg[pm[2] ? this.ptr+2 : prg[this.ptr+2]];
            else
              this.ptr+=3;
            break;
          case '06': // if [1] == false jump [2]
            if (!prg[pm[1] ? this.ptr+1 : prg[this.ptr+1]])
              this.ptr = prg[pm[2] ? this.ptr+2 : prg[this.ptr+2]];
            else
              this.ptr+=3;
            break;
          case '07': // [3] = [1] < [2] ? 1 : 0
            this.prg[prg[this.ptr+3]] =
              (prg[pm[1] ? this.ptr+1 : prg[this.ptr+1]] < prg[pm[2] ? this.ptr+2 : prg[this.ptr+2]]) ? 1 : 0;
            this.ptr+=4;
            break;
          case '08': // [3] = [1] === [2] ? 1 : 0
            this.prg[prg[this.ptr+3]] =
              (prg[pm[1] ? this.ptr+1 : prg[this.ptr+1]] === prg[pm[2] ? this.ptr+2 : prg[this.ptr+2]]) ? 1 : 0;
            this.ptr+=4;
            break;
        }
      }
    } catch (e) {
      console.log(this.name, e.message, this.output);
      return [this.input, this.output];
    }
  }
}

let prg =
  `3,8,1001,8,10,8,105,1,0,0,21,30,47,64,81,98,179,260,341,422,99999,3,9,1001,9,5,9,4,9,99,3,9,1002,9,5,9,101,4,9,9,102,2,9,9,4,9,99,3,9,102,3,9,9,101,2,9,9,1002,9,3,9,4,9,99,3,9,1001,9,5,9,1002,9,3,9,1001,9,3,9,4,9,99,3,9,1002,9,3,9,101,2,9,9,102,5,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,99`
  // `3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5`
  // `3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10`
    .split(",").map(e => +e);

// const recombinations = [
  // [9,8,7,6,5], // => 139629729
  // [9,7,8,5,6], // => 18216
  // ];
const recombinations = []; // = [[9,8,7,6,5]];
makeRecombinations(recombinations, [], [5,6,7,8,9], 5);

const powers = [];

const ampNames = ['A', 'B', 'C', 'D', 'E'];
const amplifiersCount = ampNames.length;

let prevStageOutput = 0;
recombinations.forEach(phaseSettings => {
  const unconsumedOutput = [];
  const vms = phaseSettings.map((phaseValue, idx) => new VM(ampNames[idx], prg, phaseValue, unconsumedOutput, false));
  vms.forEach((vm, idx, vms) => {
    vm.setNextVM(vms[idx === amplifiersCount-1 ? 0 : idx+1]);
  });
  const result = vms[0].useSignal(0);
  console.log('Stage', phaseSettings, 'result', result, 'unconsumed output', unconsumedOutput, unconsumedOutput.flat(2));
  powers.push(unconsumedOutput.flat(2)[0]);
});

console.log(powers);
const maxPower = powers.reduce((acc, v) => v > acc ? v : acc);
console.log(maxPower);

// const output = compute([...prg], 5);
// console.log(output);

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
