let formulas =
  /* `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL` // 31 */
  /* `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL` // 165 */
  /* `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT` // 13312 */
  /* `2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
17 NVRVD, 3 JNWZP => 8 VPVL
53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
22 VJHF, 37 MNCFX => 5 FWMGM
139 ORE => 4 NVRVD
144 ORE => 7 JNWZP
5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
145 ORE => 6 MNCFX
1 NVRVD => 8 CXFTF
1 VJHF, 6 MNCFX => 4 RFSQX
176 ORE => 6 VJHF` // 180697 */
  /*`171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX` // 2210736 */

  `1 FVBHS, 29 HWPND => 4 CPXDX
5 TNWDG, 69 VZMS, 1 GXSD, 48 NCLZ, 3 RSRZ, 15 HWPND, 25 SGPK, 2 SVCQ => 1 FUEL
1 PQRLB, 1 TWPMQ => 4 QBXC
9 QBXC => 7 RNHQ
12 VZMS => 6 MGQRZ
6 QBVG, 10 XJWX => 6 BWLZ
4 MVGN => 6 BHZH
2 LKTWD => 7 FVBHS
2 BWFK => 7 TFPQ
15 VZBJ, 9 TSVN, 2 BWLZ => 2 TNWDG
10 KVFL, 2 BWLZ, 1 VGSBF => 4 KBFJV
12 TXCR, 2 JMBG => 4 DCFD
5 VMDT, 6 JKPFT, 3 RJKJD => 7 LGWM
1 LDFGW => 2 DHRBP
129 ORE => 8 LDFGW
9 DNVRJ => 8 BMNGX
7 NLPB => 6 NCLZ
1 VMDT, 6 DCFD => 9 SGRXC
1 LDFGW, 2 VRHFB => 8 QHGQC
10 VGSBF, 5 WVMG, 6 BWLZ => 3 BWFK
4 KVFL, 1 TSVN => 6 SVCQ
2 VZBJ, 3 SWJZ => 3 QZLC
5 JMBG, 1 PQRLB => 3 CJLH
13 LKTWD, 6 TFPQ => 3 WVRXR
20 QHGQC, 10 NSPVD => 5 VGSBF
5 TFPQ, 1 DHRBP, 2 KVFL => 8 NLPB
2 KBFJV, 1 CJLH, 20 RNHQ, 1 BWLZ, 13 MNBK, 1 BHZH, 1 PKRJF => 8 RSRZ
154 ORE => 2 VRHFB
2 NHRCK => 7 DNVRJ
2 VRHFB, 4 XJWX => 4 NHRCK
1 TFPQ, 12 JMBG => 5 MNBK
8 TMFS => 2 VZMS
175 ORE => 2 TMFS
1 LBZN, 2 SWJZ, 3 VGSBF => 8 BLDN
7 KFJD, 5 WVRXR, 5 RJKJD => 6 MVGN
3 RJKJD, 1 TXCR => 8 KVFL
3 QHGQC, 1 MGQRZ, 10 VGSBF => 8 LKTWD
178 ORE => 1 XJWX
1 QBXC, 1 BWFK => 6 TSVN
1 NHRCK, 2 DHRBP => 4 VZBJ
1 LDFGW, 2 NHRCK, 10 BWLZ => 8 TWPMQ
28 TWPMQ => 4 RJKJD
10 SVCQ, 1 KVFL => 6 CZNMG
3 VZMS, 3 MGQRZ => 3 WVMG
19 MGQRZ => 8 KFJD
3 WVMG => 6 PQRLB
31 SVCQ, 1 TXCR => 8 VMDT
20 KFJD, 5 CPXDX, 2 BLDN, 2 PQWJX, 12 TFPQ, 2 BHZH, 2 MVGN => 9 SGPK
7 QZLC => 8 JMBG
1 PQRLB => 1 HWPND
9 VMDT, 5 CZNMG, 3 CPXDX, 1 MVGN, 8 VSMTK, 2 SGRXC, 1 MNBK, 8 LGWM => 7 GXSD
2 NSPVD => 8 QBVG
20 CZNMG => 4 PQWJX
1 LDFGW => 4 NSPVD
16 KBFJV, 22 BLDN => 2 VSMTK
10 BWLZ => 9 LBZN
1 BWLZ => 3 SWJZ
1 HWPND => 9 TXCR
12 CJLH, 9 LGWM, 3 BHZH => 6 PKRJF
5 BMNGX => 7 JKPFT`
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

const store = formulas.reduce((store, e) => {
  store[e.r[1]] = { spare: 0, used: 0 };
  return store;
}, {});

store['ORE'] = {spare: 0, used: 0};

console.log(formulas, store);

const fuelEF = findF(formulas, 'FUEL');
const updatedStore = produce(formulas, store, fuelEF);

console.log(updatedStore);
const usedOre = store['ORE'].used;
console.log('ANSWER 14-1', usedOre);

console.log('PART 2 is invalid. Output below is invalid');

store['FUEL'].spare = 0;
const restoredOreStore = decompose(formulas, store, fuelEF);
console.log(restoredOreStore);
const restoredOre = store['ORE'].spare;
console.log('Restored ORE', restoredOre);

let oreRemd = 1000000000000;
let fuelCount = 0;
while (oreRemd > 0) {
  if (oreRemd >= usedOre) {
    ++fuelCount;
  }
  oreRemd = oreRemd - usedOre + restoredOre;
}

// 2390226
console.log(fuelCount);

function decompose(formulas, store, eF) {
  const {r:current, s:components} = eF;
  const componentName = current[1];
  const componentBatch = current[0];
  const mult = store[componentName].spare / componentBatch;
  console.log('DECOMPOSING', componentName, store[componentName].spare, 'BATCHES', mult, components);
  store[componentName].spare = 0;
  components.forEach(([number, name]) => {
    store[name].spare += number * mult;
  });
  components.forEach(([number, name]) => {
    if (name !== 'ORE') {
      decompose(formulas, store, findF(formulas, name));
    }
  });
  return store;
}

function produce(formulas, store, eF) {
  // console.log('PRODUCING', eF.r[0], eF);
  // consume components
  eF.s.forEach(requirements => {
    // console.log('REQUIRED', requirements);
    const [requiredAmount, componentName] = requirements;
    if (componentName === 'ORE') {
      store[componentName].used += requiredAmount;
    } else {
      const component = findF(formulas, componentName);
      while (store[componentName].spare < requiredAmount) {
        produce(formulas, store, component);
      }
      // console.log('CONSUMING', requiredAmount, component);
      store[componentName].spare -= requiredAmount;
      store[componentName].used += requiredAmount;
    }
  });
  // produce result
  store[eF.r[1]].spare += eF.r[0];
  return store;
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
