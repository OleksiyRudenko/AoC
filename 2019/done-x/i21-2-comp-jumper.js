const testSuite = require("../common/test-suite");
const VM = require("../common/vm");

let testSet = testSuite.xform(xform, [
  {
    input: `109,2050,21102,1,966,1,21101,0,13,0,1105,1,1378,21102,20,1,0,1105,1,1337,21102,27,1,0,1106,0,1279,1208,1,65,748,1005,748,73,1208,1,79,748,1005,748,110,1208,1,78,748,1005,748,132,1208,1,87,748,1005,748,169,1208,1,82,748,1005,748,239,21102,1041,1,1,21101,73,0,0,1105,1,1421,21102,1,78,1,21102,1,1041,2,21101,0,88,0,1106,0,1301,21101,0,68,1,21102,1041,1,2,21101,103,0,0,1105,1,1301,1101,1,0,750,1106,0,298,21102,82,1,1,21102,1041,1,2,21102,125,1,0,1105,1,1301,1102,2,1,750,1105,1,298,21102,79,1,1,21101,1041,0,2,21101,0,147,0,1105,1,1301,21101,0,84,1,21102,1,1041,2,21101,0,162,0,1105,1,1301,1101,3,0,750,1105,1,298,21101,0,65,1,21102,1041,1,2,21102,1,184,0,1105,1,1301,21101,76,0,1,21102,1,1041,2,21101,0,199,0,1105,1,1301,21102,1,75,1,21101,1041,0,2,21101,214,0,0,1106,0,1301,21102,221,1,0,1106,0,1337,21101,0,10,1,21102,1,1041,2,21101,0,236,0,1106,0,1301,1106,0,553,21101,0,85,1,21102,1,1041,2,21102,1,254,0,1105,1,1301,21101,78,0,1,21102,1,1041,2,21102,1,269,0,1105,1,1301,21101,276,0,0,1105,1,1337,21102,10,1,1,21102,1041,1,2,21101,291,0,0,1106,0,1301,1101,1,0,755,1105,1,553,21101,0,32,1,21101,1041,0,2,21102,313,1,0,1105,1,1301,21102,320,1,0,1106,0,1337,21101,0,327,0,1106,0,1279,2102,1,1,749,21101,65,0,2,21102,1,73,3,21102,1,346,0,1106,0,1889,1206,1,367,1007,749,69,748,1005,748,360,1102,1,1,756,1001,749,-64,751,1106,0,406,1008,749,74,748,1006,748,381,1101,-1,0,751,1106,0,406,1008,749,84,748,1006,748,395,1101,0,-2,751,1105,1,406,21102,1100,1,1,21102,406,1,0,1105,1,1421,21102,1,32,1,21102,1,1100,2,21101,0,421,0,1105,1,1301,21102,428,1,0,1105,1,1337,21101,435,0,0,1106,0,1279,1202,1,1,749,1008,749,74,748,1006,748,453,1101,-1,0,752,1106,0,478,1008,749,84,748,1006,748,467,1101,-2,0,752,1105,1,478,21101,0,1168,1,21101,0,478,0,1105,1,1421,21102,1,485,0,1105,1,1337,21102,1,10,1,21101,0,1168,2,21102,500,1,0,1106,0,1301,1007,920,15,748,1005,748,518,21102,1209,1,1,21101,0,518,0,1106,0,1421,1002,920,3,529,1001,529,921,529,1002,750,1,0,1001,529,1,537,101,0,751,0,1001,537,1,545,101,0,752,0,1001,920,1,920,1105,1,13,1005,755,577,1006,756,570,21101,0,1100,1,21101,0,570,0,1106,0,1421,21102,1,987,1,1106,0,581,21101,1001,0,1,21102,1,588,0,1106,0,1378,1101,0,758,594,101,0,0,753,1006,753,654,20101,0,753,1,21101,0,610,0,1106,0,667,21102,0,1,1,21101,621,0,0,1105,1,1463,1205,1,647,21102,1,1015,1,21101,0,635,0,1105,1,1378,21102,1,1,1,21101,0,646,0,1105,1,1463,99,1001,594,1,594,1106,0,592,1006,755,664,1101,0,0,755,1106,0,647,4,754,99,109,2,1101,726,0,757,22101,0,-1,1,21101,0,9,2,21101,0,697,3,21101,0,692,0,1106,0,1913,109,-2,2105,1,0,109,2,1001,757,0,706,2101,0,-1,0,1001,757,1,757,109,-2,2106,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,255,63,223,127,95,191,159,0,207,113,215,222,188,85,170,174,173,68,249,102,172,155,120,163,213,124,116,169,185,86,241,243,219,55,156,122,177,123,117,78,39,157,183,239,106,110,232,204,79,251,107,186,245,205,198,61,143,154,43,138,118,58,126,158,187,179,56,182,139,214,250,35,228,189,136,196,171,103,218,231,34,47,60,247,226,166,230,252,121,140,57,234,227,42,184,71,69,49,101,38,141,253,109,199,235,125,236,237,217,152,244,221,53,108,197,190,54,114,206,51,233,92,254,202,229,162,76,200,203,175,62,181,115,216,99,50,98,201,94,167,84,153,246,212,178,77,137,168,70,111,119,248,142,87,242,93,100,46,220,59,238,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,73,110,112,117,116,32,105,110,115,116,114,117,99,116,105,111,110,115,58,10,13,10,87,97,108,107,105,110,103,46,46,46,10,10,13,10,82,117,110,110,105,110,103,46,46,46,10,10,25,10,68,105,100,110,39,116,32,109,97,107,101,32,105,116,32,97,99,114,111,115,115,58,10,10,58,73,110,118,97,108,105,100,32,111,112,101,114,97,116,105,111,110,59,32,101,120,112,101,99,116,101,100,32,115,111,109,101,116,104,105,110,103,32,108,105,107,101,32,65,78,68,44,32,79,82,44,32,111,114,32,78,79,84,67,73,110,118,97,108,105,100,32,102,105,114,115,116,32,97,114,103,117,109,101,110,116,59,32,101,120,112,101,99,116,101,100,32,115,111,109,101,116,104,105,110,103,32,108,105,107,101,32,65,44,32,66,44,32,67,44,32,68,44,32,74,44,32,111,114,32,84,40,73,110,118,97,108,105,100,32,115,101,99,111,110,100,32,97,114,103,117,109,101,110,116,59,32,101,120,112,101,99,116,101,100,32,74,32,111,114,32,84,52,79,117,116,32,111,102,32,109,101,109,111,114,121,59,32,97,116,32,109,111,115,116,32,49,53,32,105,110,115,116,114,117,99,116,105,111,110,115,32,99,97,110,32,98,101,32,115,116,111,114,101,100,0,109,1,1005,1262,1270,3,1262,20102,1,1262,0,109,-1,2106,0,0,109,1,21101,0,1288,0,1105,1,1263,21002,1262,1,0,1101,0,0,1262,109,-1,2106,0,0,109,5,21102,1,1310,0,1105,1,1279,21202,1,1,-2,22208,-2,-4,-1,1205,-1,1332,22101,0,-3,1,21101,0,1332,0,1105,1,1421,109,-5,2106,0,0,109,2,21101,0,1346,0,1105,1,1263,21208,1,32,-1,1205,-1,1363,21208,1,9,-1,1205,-1,1363,1106,0,1373,21102,1,1370,0,1105,1,1279,1106,0,1339,109,-2,2105,1,0,109,5,2102,1,-4,1385,21002,0,1,-2,22101,1,-4,-4,21101,0,0,-3,22208,-3,-2,-1,1205,-1,1416,2201,-4,-3,1408,4,0,21201,-3,1,-3,1106,0,1396,109,-5,2106,0,0,109,2,104,10,22102,1,-1,1,21101,0,1436,0,1106,0,1378,104,10,99,109,-2,2106,0,0,109,3,20002,594,753,-1,22202,-1,-2,-1,201,-1,754,754,109,-3,2105,1,0,109,10,21102,1,5,-5,21101,1,0,-4,21102,0,1,-3,1206,-9,1555,21101,0,3,-6,21102,5,1,-7,22208,-7,-5,-8,1206,-8,1507,22208,-6,-4,-8,1206,-8,1507,104,64,1105,1,1529,1205,-6,1527,1201,-7,716,1515,21002,0,-11,-8,21201,-8,46,-8,204,-8,1106,0,1529,104,46,21201,-7,1,-7,21207,-7,22,-8,1205,-8,1488,104,10,21201,-6,-1,-6,21207,-6,0,-8,1206,-8,1484,104,10,21207,-4,1,-8,1206,-8,1569,21102,1,0,-9,1105,1,1689,21208,-5,21,-8,1206,-8,1583,21101,0,1,-9,1105,1,1689,1201,-5,716,1588,21001,0,0,-2,21208,-4,1,-1,22202,-2,-1,-1,1205,-2,1613,22101,0,-5,1,21101,0,1613,0,1106,0,1444,1206,-1,1634,21202,-5,1,1,21101,1627,0,0,1105,1,1694,1206,1,1634,21102,2,1,-3,22107,1,-4,-8,22201,-1,-8,-8,1206,-8,1649,21201,-5,1,-5,1206,-3,1663,21201,-3,-1,-3,21201,-4,1,-4,1106,0,1667,21201,-4,-1,-4,21208,-4,0,-1,1201,-5,716,1676,22002,0,-1,-1,1206,-1,1686,21102,1,1,-4,1105,1,1477,109,-10,2106,0,0,109,11,21101,0,0,-6,21102,1,0,-8,21101,0,0,-7,20208,-6,920,-9,1205,-9,1880,21202,-6,3,-9,1201,-9,921,1725,20102,1,0,-5,1001,1725,1,1732,21001,0,0,-4,21202,-4,1,1,21102,1,1,2,21101,0,9,3,21101,0,1754,0,1106,0,1889,1206,1,1772,2201,-10,-4,1766,1001,1766,716,1766,21001,0,0,-3,1105,1,1790,21208,-4,-1,-9,1206,-9,1786,22102,1,-8,-3,1106,0,1790,21201,-7,0,-3,1001,1732,1,1796,20102,1,0,-2,21208,-2,-1,-9,1206,-9,1812,22102,1,-8,-1,1106,0,1816,21201,-7,0,-1,21208,-5,1,-9,1205,-9,1837,21208,-5,2,-9,1205,-9,1844,21208,-3,0,-1,1105,1,1855,22202,-3,-1,-1,1106,0,1855,22201,-3,-1,-1,22107,0,-1,-1,1106,0,1855,21208,-2,-1,-9,1206,-9,1869,21202,-1,1,-8,1106,0,1873,22102,1,-1,-7,21201,-6,1,-6,1106,0,1708,22101,0,-8,-10,109,-11,2106,0,0,109,7,22207,-6,-5,-3,22207,-4,-6,-2,22201,-3,-2,-1,21208,-1,0,-6,109,-7,2105,1,0,0,109,5,1201,-2,0,1912,21207,-4,0,-1,1206,-1,1930,21101,0,0,-4,21201,-4,0,1,22102,1,-3,2,21102,1,1,3,21102,1949,1,0,1105,1,1954,109,-5,2106,0,0,109,6,21207,-4,1,-1,1206,-1,1977,22207,-5,-3,-1,1206,-1,1977,21202,-5,1,-5,1105,1,2045,22102,1,-5,1,21201,-4,-1,2,21202,-3,2,3,21101,1996,0,0,1105,1,1954,21202,1,1,-5,21102,1,1,-2,22207,-5,-3,-1,1206,-1,2015,21102,0,1,-2,22202,-3,-2,-3,22107,0,-4,-1,1206,-1,2037,22101,0,-2,1,21101,0,2037,0,106,0,1912,21202,-3,-1,-3,22201,-5,-3,-5,109,-6,2105,1,0`,
    expected: 1142814363,
  },
]);

const lastAnswer = testSuite.run(main, testSet, friendlyInput, 1);

console.log("ANSWER 21-2", lastAnswer);

function main(input) {
  const vm = new VM("R", input, [], false);
  let prg = [
    // if any of (A,B,C) is EMPTY and D is FULL then JUMP
    'NOT A J',
    'NOT B T',
    'OR T J',
    'NOT C T',
    'OR T J',
    'AND D J',
    // have to JUMP?
    'NOT E T',
    // can we JUMP at H?
    'AND H T',
    // E or H are FULL?
    'OR E T',
    // JUMP only if E or H is FULL
    'AND T J',
    'RUN',
  ];
  let res;

  res = vm.run();
  console.log('>', printMap(res));
  for (;true;) {
    console.log("PRG:", prg);
    res = vm.run(encode(prg));
    console.log('>', printMap(res));
    if (res[0] > 256 || vm.state === 'halted') {
      break;
    }
  }

  return res[res.length-1];
}

function encode(commands) {
  return (commands.join("\n")+"\n").split('').map(char => char.charCodeAt(0));
}

function printMap(seq) {
  return seq.map(code => String.fromCharCode(code)).join('');
}

function xform(input) {
  return input.split(",").map(Number);
}

function friendlyInput(input) {
  return input.join('').slice(0,32);
}
