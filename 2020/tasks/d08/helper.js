class Comp {
  constructor(prg, spawn = false) {
    this.prg = prg;
    this.ptr = 0;
    this.accum = 0;
  }

  run() {
    const ptrs = [];
    while (!ptrs.includes(this.ptr) && this.ptr <= this.prg.length) {
      const [command, value] = this.prg[this.ptr];
      // console.log(this.ptr, command, value, this[command]);
      ptrs.push(this.ptr);
      this[command](value);
    }
    return this.accum;
  }

  nop() { this.ptr++; }
  acc(v) { this.accum += v; this.ptr++; }
  jmp(v) { this.ptr+=v;}
}

class Comp2 {
  constructor(prg) {
    this.prg = prg;
    this.reset();
  }

  run() {
    while (this.ptr < this.prg.length) {
      if (this.trace.findIndex(e => e[0] === this.ptr) > -1) {
        throw new Error('LOOP');
      }
      const [command, value] = this.prg[this.ptr];
      // console.log('EXEC', this.ptr, this.accum, command, value);
      this.trace.push([this.ptr, command, value, this.accum]);
      this[command](value);
    }
    return this.accum;
  }

  nop(v) { this.ptr++; }
  acc(v) { this.accum += v; this.ptr++; }
  jmp(v) { this.ptr+=v; }

  reset() {
    this.ptr = 0;
    this.accum = 0;
    this.trace = [];
  }
}

module.exports = { Comp, Comp2 };
