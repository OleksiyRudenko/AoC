let src = `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`
  .split("\n")
  .map(s => {
    const p = s.split('=>').map(s => s.trim());
    const res = {
      r: numerizeQuantity(p[1].split(' ')),
      s: p[0],
    };
    res.s = res.s.split(',')
      .map(s => numerizeQuantity(s.trim().split(' ')));
    return res;
  });

console.log(src);

const fuelE = findF(src, 'FUEL');
const fuelAmount = sumF(src, fuelE);

console.log('ANSWER 14-1', fuelAmount);

function sumF(formulas, eF) {
  console.log('Summing up', eF);
  return eF.s.reduce((sum, e) => {
    if (e[1] === 'ORE') return sum + e[0];
    console.log('For', e[1]);
    const target = findF(formulas, e[1]);
    console.log('For', e[1], 'found', target);
    return sum + sumF(formulas, target);
  }, 0);
}

function findF(formulas, eName) {
  const l = formulas.length;
  for (let i = 0; i < l; i++) {
    if (formulas[i].r[1] === eName) {
      return formulas[i];
    }
  }
  return null;
}

function numerizeQuantity(a2) {
  return [+a2[0], a2[1]];
}
