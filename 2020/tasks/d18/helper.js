function evaluate2(e) {
  // console.log('>>', e);

  if (e.length > 3) {
    for (let i = 0; i < e.length; i++) {
      if (e[i] === '+') {
        e.splice(i-1, 3, [e[i-1], '+', e[i+1]]);
        i--;
      }
    }
  }

  // console.log('**', e);

  e = e.map(op => {
    // console.log('.', op, Array.isArray(op));
    return Array.isArray(op)
      ? evaluate2(op) : op
  });

  while (e.length > 2) {
    let operands = [];
    operands.push(e.shift());
    const operator = e.shift();
    operands.push(e.shift());
    operands = operands.map(op => +op);
    switch (operator) {
      case '+':
        e.unshift(operands[0] + operands[1]);
        break;
      case '*':
        e.unshift(operands[0] * operands[1]);
        break;
    }
  }
  // console.log('<<', e[0]);
  return e[0];
}

function evaluate(e) {
  // console.log('>>', e)
  e = e.map(op => {
    // console.log('.', op, Array.isArray(op));
    return Array.isArray(op)
      ? evaluate(op) : op
  });

  while (e.length > 2) {
    let operands = [];
    operands.push(e.shift());
    const operator = e.shift();
    operands.push(e.shift());
    operands = operands.map(op => +op);
    switch (operator) {
      case '+':
        e.unshift(operands[0] + operands[1]);
        break;
      case '*':
        e.unshift(operands[0] * operands[1]);
        break;
    }
  }
  // console.log('<<', e[0]);
  return e[0];
}

module.exports = { evaluate, evaluate2 };
