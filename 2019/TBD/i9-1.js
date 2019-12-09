const VM = require("./vm");

let prg =
  `109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99` // prints itself
  // `1102,34915192,34915192,7,4,7,99,0` // prints 16-digit number 1219070632396864
  // `104,1125899906842624,99` // prints bug number 1125899906842624
  .split(",").map(e => +e);

const vm = new VM('A', prg, [], true);

console.log(vm.run());

console.log();
