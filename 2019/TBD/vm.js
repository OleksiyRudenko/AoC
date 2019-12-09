class VM {
  constructor(name, initialPrg, initialInput = [], debug = false) {
    this.name = name;
    this.prg = [...initialPrg];
    this.input = Array.isArray(initialInput) ? initialInput : [initialInput];
    this.debug = debug;
    this.ptr = 0;
    this.relBase = 0;
    this.state = 'suspended'; // running | suspended | halted
    this.output = [];
  }
  getValue(pm, pn) { // params mode, param number
    return this.prg[this.getAddress(pm, pn)] || 0;
  }
  getAddress(pm, pn) { // params mode, param number
    switch (pm[pn]) {
      case 0: return this.prg[this.ptr + pn];
      case 1: return this.ptr + pn;
      case 2: return this.relBase + this.prg[this.ptr + pn];
    }
  }
  run(input = []) {
    if (!Array.isArray(input)) input = [input];
    this.input = [...this.input, ...input];
    const prg = this.prg;
    this.debug && console.log(this.name, 'RESUMED with INPUT', this.input);
    if (this.state === 'halted') {
      console.log(this.name, 'FATAL ERROR: Tried to resume HALTED VM. Input was', this.input);
      return this.input;
    }
    while (true) {
      this.state = 'running';
      const instruction = (this.prg[this.ptr]+'').padStart(5,'0');
      const cmd = instruction.slice(-2);
      // params modes (param contains): 0 - address, 1 - value, 2 - relBase offset
      const pm = instruction.split('').slice(0,3).reverse().map(e => +e);
      pm.unshift('');
      const seq = this.prg.slice(this.ptr, this.ptr+4);
      // this.debug && console.log(this.name, 'ptr', this.ptr, 'relBase', this.relBase, cmd, pm, seq);
      const debugPrefix = this.name + ' ptr: ' + (this.ptr+'').padStart(3,'0') +
        ' relBase: ' + (this.relBase+'').padStart(3,'0') +
        ' cmd ' + cmd + ' mode ' + pm.toString();
      switch (cmd) {
        case '99': // exit
          this.debug && console.log(debugPrefix, 'HALTED with output', this.output);
          this.state = 'halted';
          const signal = [...this.output];
          this.output = [];
          return signal;
        case '01': // [3] = [1] + [2]
          this.debug && console.log(debugPrefix,
            `SUM(${prg[this.ptr+1]}, ${prg[this.ptr+2]}, ${this.ptr+prg[3]})`,
            `[${this.getAddress(pm, 3)}] = ${this.getValue(pm,1)} + ${this.getValue(pm,2)}`);
          this.prg[this.getAddress(pm, 3)] =
            this.getValue(pm, 1) + this.getValue(pm, 2);
          this.ptr+=4;
          break;
        case '02': // [3] = [1] * [2]
          this.prg[this.getAddress(pm, 3)] =
            this.getValue(pm, 1) * this.getValue(pm, 2);
          this.ptr+=4;
          break;
        case '03': // [1] = user input
          if (this.input.length) {
            this.prg[this.getAddress(pm, 1)] = this.input.shift();
            this.debug && console.log(this.name,
              'USED INPUT', prg[this.getAddress(pm, 1)],
              'Remaining', this.input);
            if (prg[this.getAddress(pm, 1)] === undefined) {
              console.log(this.name, "FATAL ERROR: Input contains 'undefined':", this.input,
                'Current output:', this.output);
              const signal = [...this.output];
              this.output = [];
              return signal;
            }
            this.ptr+=2;
          } else {
            this.state = 'suspended';
            this.debug && console.log(this.name, '03 - SUSPENDED');
            const signal = [...this.output];
            this.output = [];
            return signal;
          }
          break;
        case '04': // output [1]
          this.debug && console.log(debugPrefix,
            `OUTPUT(${prg[this.ptr + 1]})`,
            `${this.getValue(pm,1)}`);
          const result = this.getValue(pm, 1);
          this.output.push(result);
          // this.debug && console.log(this.name, '04 - OUTPUT', result);
          this.ptr+=2;
          break;
        case '05': // if [1] == true jump [2]
          if (this.getValue(pm,1))
            this.ptr = this.getValue(pm, 2);
          else
            this.ptr += 3;
          break;
        case '06': // if [1] == false jump [2]
          this.debug && console.log(debugPrefix,
            `JMP-on-FALSE(${prg[this.ptr+1]}, ${prg[this.ptr+2]})`,
            `${this.getValue(pm,1)} == FALSE? => ${this.getValue(pm,2)}`);
          if (!this.getValue(pm, 1))
            this.ptr = this.getValue(pm, 2);
          else
            this.ptr += 3;
          break;
        case '07': // [3] = [1] < [2] ? 1 : 0
          this.prg[this.getAddress(pm, 3)] =
            this.getValue(pm, 1) < this.getValue(pm, 2) ? 1 : 0;
          this.ptr += 4;
          break;
        case '08': // [3] = [1] === [2] ? 1 : 0
          this.prg[this.getAddress(pm, 3)] =
            this.getValue(pm, 1) === this.getValue(pm, 2) ? 1 : 0;
          this.ptr+=4;
          break;
        case '09': // relBase += [1]
          this.relBase += this.getValue(pm, 1);
          this.ptr += 2;
          break;
      }
    }
  }
}

module.exports = VM;
