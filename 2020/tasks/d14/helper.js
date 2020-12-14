function getAddresses(seed, mask) {
  seed = dec2bin(seed);
  const addresses = [];
  let addressTemplate = applyAddressMask(seed, mask);
  const countX = [...addressTemplate]
    .reduce((sum, ch) => sum + (ch === 'X' ? 1 : 0),
      0);
  console.log('>>>>>', addressTemplate, countX);
  for (let m = 0; m < 2 ** countX; m++) {
    const address = setX(addressTemplate, m, countX);
    // console.log(address);
    addresses.push(bin2dec(address));
  }
  // console.log(addresses);
  return addresses;
}

function setX(template, v, len) {
  template = [...template];
  v = [...dec2bin(v).slice(-len)];
  // console.log('---', template.join(''), v.join(''));
  let xoccurence = 0;
  template.forEach((e, i) => {
    if (e === 'X') {
      template[i] = v[xoccurence++];
    }
  });
  return template.join('');
}

function applyAddressMask(target, mask) {
  target = [...target];
  mask = [...mask];
  mask.forEach((ch, i) => {
    if (ch === 'X' || ch === '1') {
      target[i] = ch;
    }
  });
  return target.join('');
}

function dec2bin(dec) {
  let bin = "";
  do {
    bin = dec % 2 + bin;
    dec = Math.floor(dec / 2);
  } while (dec > 0);
  return bin.padStart(36, '0');
}

function applyMask(binstr, mask) {
  binstr = [...binstr];
  mask = [...mask];
  mask.forEach((e, i) => {
    if (e === '1' || e === '0') binstr[i] = e;
  });
  return binstr.join('');
}

function bin2dec(binstr) {
  binstr = [...binstr];
  let result = 0;
  binstr.forEach(digit => {
    result = result * 2 + (+digit);
  });
  return result;
}

module.exports = { dec2bin, applyMask, bin2dec, getAddresses };
