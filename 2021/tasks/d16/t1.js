const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
// const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 0,
  6,
  9,
  14,
  16, // 4+1+5+6 -- 8A004A801A8002F478
  12, // 3+x+y   -- 620080001611562C8802118E34
  23, // x+y+z   -- C0015000016115A2E0802F182340
  31, // x+y+z   -- A0016C880162017C3686B18A3D4780
] // failures: ?>X ?<X
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet,
  [
    6
    // 1, 2, 3,
    // 4, 5, 6, 7,
    // 0,
  ],
  friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  console.log(input.length, input);
  input = input.split("")
    .map(hex => parseInt(hex, 16)) // hex2dec
    .map(dec => dec.toString(2).padStart(4, '0')) // dec2bin
    .join('')
    .split('').map(n=>+n)
  ;

  console.log(input.length, input.join(''));

  const packets = parsePacket(input, false);
  console.log(JSON.stringify(packets, null, 2));

  const versions = extractVersions([packets]).flat(100);
  console.log("VERSIONS", versions);

  return versions.reduce((sum, v) => sum+v, 0);
}

function extractVersions(packets) {
  const versions = [];
  for (let packet of packets) {
    if (packet.content !== undefined) versions.push(packet.v);
    if (packet.t !== 4 && packet.content !== undefined) {
      versions.push(extractVersions(packet.content));
    }
  }
  return versions;
}

function parsePacket(bits, eatTails = false, nestLevel = 0) {
  const padding = ''.padStart(nestLevel, ' ') ;
  console.log(padding, nestLevel, ">>>>> Parse Packet");
  console.log(padding, "bits", bits.length, `"${bits.join('')}"`);
  if (bits.length < 6) {
    console.log(padding, "!!!! Too few data! on entry", bits.length)
    return {
      v: 0,
      t: 0,
      bl: 0,
      content: undefined,
    };
  }
  console.log("\n") ;
  const v = parseInt(bits.splice(0, 3).join(''), 2);
  const t = parseInt(bits.splice(0, 3).join(''), 2);
  console.log(padding, "v,t", v, t,);
  let content;
  let bl = 0;
  if (bits.length < 5) {
    console.log(padding, "!!!! Too few data! After v/t", bits.length);
    return {
      v: 0,
      t: 0,
      bl: 0,
      content: undefined,
    };
  }

  if (t === 4) { // literal
    [content, bl] = getLiteral(bits, 6);
  } else {
    // operator
    const lengthType = bits.shift();
    bl += 1;
    if (lengthType) {
      // number of immediate subpackets
      const subPn = parseInt(bits.splice(0, 11).join(''), 2);
      content = [];
      console.log(padding, "sub-packets #", subPn);
      for (let spn = 0; spn < subPn; spn++) {
        const subP = parsePacket(bits, false, nestLevel+1);
        bl += subP.bl;
        content.push(subP);
      }
    } else {
      // bit length of subpackets
      let subPbl = parseInt(bits.splice(0, 15).join(''), 2);
      let subP;
      console.log(padding, "sub-packets bits", "still need", subPbl, "available", bits.length);
      content = [];
      while (subPbl > 0) {
        if (bits.length < subPbl) {
          console.log(padding, "Insufficient bits to process", "need", subPbl, "available", bits.length);
          break ;
        }
        subP = parsePacket(bits, false, nestLevel+1);
        console.log(padding, "subP", subP.bl, /* subP */);
        content.push(subP);
        bl += subP.bl;
        subPbl -= subP.bl;
      }
    }
  }

  bl += 6; // header

  /* if (eatTails) {
    const tailLength = 4 - (bl % 4);
    if (tailLength < 4) {
      const tail = bits.splice(0, tailLength);
      bl += tailLength;
    }
  } */

  return {
    v,
    t,
    bl,
    content,
  };
}

function getLiteral(bits, consumed) { // [literal, bitLength]
  let literal = [];
  const groups = [];
  let count5 = 0;
  for (let readMore = 1; readMore !== 0; ) {
    readMore = bits.shift();
    count5++;
    const bits4 = bits.splice(0, 4);
    literal = [...literal, ...bits4];
    groups.push(`${readMore},${bits4.join('')}`);
  }
  // eat trailing zeros?
  /*
  let packetLengthSoFar = consumed + count5 * 5;

  let tailLength = 4 - (packetLengthSoFar % 4);
  if (tailLength === 4) tailLength = 0;
  if (tailLength) {
    const tail = bits.splice(0, tailLength);
    packetLengthSoFar += tailLength;
  }
  */


  return [
    {
      literal: parseInt(literal.join(''), 2),
      sourceGroups: groups.join("; "),
    },
    count5 * 5,
    // packetLengthSoFar - consumed,
  ];
}

function friendlyInput(input) {
  return input; //.map(row => row.join('')).join("\n");
}
