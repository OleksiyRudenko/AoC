const testSuite = require("./TBD/test-suite");
const VM = require("./TBD/vm");
const T = require("./TBD/tools");

let testSet = testSuite.xform(xform, [
  {
    input: `1,330,331,332,109,3130,1101,0,1182,15,1102,1,1453,24,1001,0,0,570,1006,570,36,1001,571,0,0,1001,570,-1,570,1001,24,1,24,1105,1,18,1008,571,0,571,1001,15,1,15,1008,15,1453,570,1006,570,14,21101,58,0,0,1106,0,786,1006,332,62,99,21101,0,333,1,21101,0,73,0,1105,1,579,1102,0,1,572,1102,0,1,573,3,574,101,1,573,573,1007,574,65,570,1005,570,151,107,67,574,570,1005,570,151,1001,574,-64,574,1002,574,-1,574,1001,572,1,572,1007,572,11,570,1006,570,165,101,1182,572,127,1002,574,1,0,3,574,101,1,573,573,1008,574,10,570,1005,570,189,1008,574,44,570,1006,570,158,1105,1,81,21101,340,0,1,1106,0,177,21102,477,1,1,1106,0,177,21102,514,1,1,21102,1,176,0,1105,1,579,99,21102,184,1,0,1106,0,579,4,574,104,10,99,1007,573,22,570,1006,570,165,1002,572,1,1182,21101,375,0,1,21101,211,0,0,1106,0,579,21101,1182,11,1,21101,0,222,0,1106,0,979,21102,388,1,1,21101,0,233,0,1106,0,579,21101,1182,22,1,21101,244,0,0,1106,0,979,21101,401,0,1,21101,0,255,0,1106,0,579,21101,1182,33,1,21102,266,1,0,1105,1,979,21101,0,414,1,21101,0,277,0,1106,0,579,3,575,1008,575,89,570,1008,575,121,575,1,575,570,575,3,574,1008,574,10,570,1006,570,291,104,10,21101,0,1182,1,21102,1,313,0,1105,1,622,1005,575,327,1101,1,0,575,21102,1,327,0,1105,1,786,4,438,99,0,1,1,6,77,97,105,110,58,10,33,10,69,120,112,101,99,116,101,100,32,102,117,110,99,116,105,111,110,32,110,97,109,101,32,98,117,116,32,103,111,116,58,32,0,12,70,117,110,99,116,105,111,110,32,65,58,10,12,70,117,110,99,116,105,111,110,32,66,58,10,12,70,117,110,99,116,105,111,110,32,67,58,10,23,67,111,110,116,105,110,117,111,117,115,32,118,105,100,101,111,32,102,101,101,100,63,10,0,37,10,69,120,112,101,99,116,101,100,32,82,44,32,76,44,32,111,114,32,100,105,115,116,97,110,99,101,32,98,117,116,32,103,111,116,58,32,36,10,69,120,112,101,99,116,101,100,32,99,111,109,109,97,32,111,114,32,110,101,119,108,105,110,101,32,98,117,116,32,103,111,116,58,32,43,10,68,101,102,105,110,105,116,105,111,110,115,32,109,97,121,32,98,101,32,97,116,32,109,111,115,116,32,50,48,32,99,104,97,114,97,99,116,101,114,115,33,10,94,62,118,60,0,1,0,-1,-1,0,1,0,0,0,0,0,0,1,18,42,0,109,4,2101,0,-3,586,21002,0,1,-1,22101,1,-3,-3,21102,0,1,-2,2208,-2,-1,570,1005,570,617,2201,-3,-2,609,4,0,21201,-2,1,-2,1106,0,597,109,-4,2106,0,0,109,5,2101,0,-4,630,20102,1,0,-2,22101,1,-4,-4,21102,1,0,-3,2208,-3,-2,570,1005,570,781,2201,-4,-3,653,20101,0,0,-1,1208,-1,-4,570,1005,570,709,1208,-1,-5,570,1005,570,734,1207,-1,0,570,1005,570,759,1206,-1,774,1001,578,562,684,1,0,576,576,1001,578,566,692,1,0,577,577,21102,702,1,0,1106,0,786,21201,-1,-1,-1,1105,1,676,1001,578,1,578,1008,578,4,570,1006,570,724,1001,578,-4,578,21101,0,731,0,1106,0,786,1106,0,774,1001,578,-1,578,1008,578,-1,570,1006,570,749,1001,578,4,578,21101,756,0,0,1106,0,786,1105,1,774,21202,-1,-11,1,22101,1182,1,1,21101,774,0,0,1106,0,622,21201,-3,1,-3,1106,0,640,109,-5,2106,0,0,109,7,1005,575,802,21002,576,1,-6,20102,1,577,-5,1106,0,814,21102,1,0,-1,21102,0,1,-5,21102,1,0,-6,20208,-6,576,-2,208,-5,577,570,22002,570,-2,-2,21202,-5,39,-3,22201,-6,-3,-3,22101,1453,-3,-3,2102,1,-3,843,1005,0,863,21202,-2,42,-4,22101,46,-4,-4,1206,-2,924,21101,0,1,-1,1105,1,924,1205,-2,873,21102,1,35,-4,1106,0,924,2102,1,-3,878,1008,0,1,570,1006,570,916,1001,374,1,374,2101,0,-3,895,1101,0,2,0,1202,-3,1,902,1001,438,0,438,2202,-6,-5,570,1,570,374,570,1,570,438,438,1001,578,558,921,21001,0,0,-4,1006,575,959,204,-4,22101,1,-6,-6,1208,-6,39,570,1006,570,814,104,10,22101,1,-5,-5,1208,-5,43,570,1006,570,810,104,10,1206,-1,974,99,1206,-1,974,1102,1,1,575,21102,1,973,0,1106,0,786,99,109,-7,2105,1,0,109,6,21102,0,1,-4,21101,0,0,-3,203,-2,22101,1,-3,-3,21208,-2,82,-1,1205,-1,1030,21208,-2,76,-1,1205,-1,1037,21207,-2,48,-1,1205,-1,1124,22107,57,-2,-1,1205,-1,1124,21201,-2,-48,-2,1106,0,1041,21101,0,-4,-2,1105,1,1041,21101,-5,0,-2,21201,-4,1,-4,21207,-4,11,-1,1206,-1,1138,2201,-5,-4,1059,1202,-2,1,0,203,-2,22101,1,-3,-3,21207,-2,48,-1,1205,-1,1107,22107,57,-2,-1,1205,-1,1107,21201,-2,-48,-2,2201,-5,-4,1090,20102,10,0,-1,22201,-2,-1,-2,2201,-5,-4,1103,2102,1,-2,0,1106,0,1060,21208,-2,10,-1,1205,-1,1162,21208,-2,44,-1,1206,-1,1131,1106,0,989,21101,439,0,1,1106,0,1150,21101,0,477,1,1106,0,1150,21101,0,514,1,21101,0,1149,0,1106,0,579,99,21102,1157,1,0,1105,1,579,204,-2,104,10,99,21207,-3,22,-1,1206,-1,1138,2101,0,-5,1176,1201,-4,0,0,109,-6,2105,1,0,18,13,26,1,11,1,26,1,11,1,26,1,11,1,26,1,11,1,26,1,11,1,26,1,11,1,26,1,11,1,22,5,11,1,22,1,15,1,22,1,11,5,22,1,11,1,18,11,9,1,18,1,7,1,1,1,9,1,18,1,7,1,1,1,9,1,18,1,7,1,1,1,9,1,18,1,5,5,9,1,18,1,5,1,1,1,11,1,18,1,5,1,1,9,3,9,10,1,5,1,9,1,11,1,10,1,5,1,9,1,11,1,10,1,5,1,9,1,11,1,10,1,5,1,9,1,11,1,10,1,5,1,9,1,11,1,10,9,5,11,3,1,16,1,1,1,5,1,1,1,7,1,3,1,16,11,5,11,14,1,5,1,7,1,1,1,3,1,3,1,14,1,5,1,7,1,1,5,3,1,14,1,5,1,7,1,9,6,9,1,5,1,7,1,9,2,3,1,9,1,5,1,7,1,10,1,3,1,7,11,5,1,10,1,3,1,7,1,1,1,5,1,1,1,5,1,10,1,3,11,5,9,10,1,11,1,9,1,16,1,11,1,9,1,16,1,11,1,9,1,16,1,11,1,9,1,16,1,11,1,9,1,16,13,9,1,38,1,34,5,16`,
    expected: 807320,
  },
]);

const lastAnswer = testSuite.run(main, testSet, friendlyInput, 1);

function main(input) {
  const vm = new VM("R", input, [], false);
  const res = vm.run([]);

  const mx = [];
  let row = [], rowc = 0, colc = 0;
  const bots = [];
  res.forEach(e => {
    if (e === 10) {
      mx.push(row);
      row = [];
      rowc++;
      colc = 0;
    } else {
      let char = String.fromCharCode(e);
      switch (char) {
        case 'v': case '>': case '<': case '^': case 'X':
          bots.push({
            c: [colc, rowc],
            d: char,
          });
          char = char === 'X' ? '.' : '#';
          break;
      }
      row.push(char);
      colc++;
    }
  });
  // console.log(T.matrix2lines(mx));

  let iSectionsSum = 0;
  mx.forEach((row, ri) => {
    row.forEach((col, ci) => {
      if (ri > 0 && ri < rowc-1)
      if (mx[ri][ci] === '#') {
        if (
          mx[ri-1][ci] === '#'
          && mx[ri+1][ci] === '#'
          && mx[ri][ci-1] === '#'
          && mx[ri][ci+1] === '#'
        ) {
          console.log('x @', ri, ci);
          iSectionsSum += ri * ci;
        }
      }
    })
  });

  console.log('ANSWER 17-1', iSectionsSum);

  console.log(bots);
  const bot = bots[0];
  // mx[bot.c[1]][[bot.c[0]]] = bot.d;
  console.log(T.matrix2lines(mx));

  // ---
  console.log('PART 2: manual');
  const dirMap = {
    '^': 0, '>': 1, 'v': 2, '<': 3,
  };
  bot.d = dirMap[bot.d];
  const instructions = drive(mx, bot);
  T.test(instructions, 'R,4,L,10,L,10,L,8,R,12,R,10,R,4,R,4,L,10,L,10,L,8,R,12,R,10,R,4,R,4,L,10,L,10,L,8,L,8,R,10,R,4,L,8,R,12,R,10,R,4,L,8,L,8,R,10,R,4,R,4,L,10,L,10,L,8,L,8,R,10,R,4','Matrix & Bot');
  const prg = makeProgram(instructions);

  console.log('PRG', prg);

  const seq = Object.values(prg)
    .map(s => s+"\n")
    .map(s => [...s].map(c => c.charCodeAt(0)))
    .flat();

  seq.push('n'.charCodeAt(0));
  seq.push(10);

  console.log('SEQ', seq);

  input[0] = 2;
  const vm2 = new VM("R", input, [], false);
  const res2 = vm2.run(seq);

  console.log('VM2 output START');
  console.log(decode(res2));
  console.log('VM2 output END');

  console.log('ANSWER 17-2', res2[res2.length-1]);

  return res2[res2.length-1];
}

function decode(charList) {
  return charList.map(charCode => String.fromCharCode(charCode)).join('');
}

/**
 @param {string} instructions - csv
 @param {number} maxChunkLen -
 **/
function makeProgram(instructions, maxChunkLen) {
  // "R,4,L,12" => [ R, 4, L, 12 ] {string}
  const inflated = instructions.split(',');
  // [ R, 4, L, 12 ] => R4LC
  const hexalized = inflated.reduce((str, e) =>
    str + (e.length > 1 ? String.fromCharCode(+e - 10 + 65) : e), '');
  // R4LCR4L8LC => 12132 where 1=R4, 2=LC, 3=L8
  const tokenized = hexalized.match(/.{1,2}/gi)
    .reduce((acc, e) => {
      let token = acc.tokens[e];
      if (!token) {
        token = acc.nextToken++;
        acc.tokens[e] = token;
      }
      acc.seq += token;
      return acc;
    }, {
      seq: '',
      nextToken: 1,
      tokens: {},
    });

  console.log('ZIP 1', inflated, hexalized, tokenized);

  const variations = [
    {
      seq: 'ABABACBCAC',
      dict: {
        A: '122',
        B: '3451',
        C: '3351',
      },
    },
  ];
  let nextVariation = variations.length;

  // ... create compressed variation from tokenized
  let source = tokenized.seq;


  // Decode variations
  const restoreCode = (s, tokens) => {
    tokens = Object.entries(tokens).reduce((arr,entry) => {
      arr[entry[1]]= entry[0];
      return arr;
    }, []);
    return s.split('').map(i=>tokens[+i]) // detokenize
      .map(pair => { // dehexalize
        const e = pair.split('');
        const number = (e[1] > '@') ? e[1].charCodeAt(0) - 65 + 10 : e[1];

        return [e[0], number];
      })
      .flat() // flatten nested pairs
      .join(',');
  };

  variations.forEach(v => {
    v.seq = v.seq.split('').join(',');
    v.dict = Object.fromEntries(Object.entries(v.dict).map(entry => {
      entry[1] = restoreCode(entry[1], tokenized.tokens);
      return entry;
    }));
  });

  // console.log('ZIP RESTORED VARIATIONS', variations);

  // ... choose best variation
  const bestVariation = variations[0];

  return {
    '@': bestVariation.seq,
    ...bestVariation.dict,
  };


  //  0123456790123456789
  //  R,5,R,5,R,5,R,5,R,5
  /* `>A R,4,L,10,L,10,
   >B L,8,R,12,R,10,R,4,
   >A R,4,L,10,L,10,
   >B L,8,R,12,R,10,R,4,
   >A R,4,L,10,L,10,
   >C L,8,L,8,R,10,R,4,
   >B L,8,R,12,R,10,R,4,
   >C L,8,L,8,R,10,R,4,
   >A R,4,L,10,L,10,
   >C L,8,L,8,R,10,R,4,
   `; */

  /* return {
    // : '01234567890123456789
    '@': 'A,B,A,B,A,C,B,C,A,C',
    'A': 'R,4,L,10,L,10',
    'B': 'L,8,R,12,R,10,R,4',
    'C': 'L,8,L,8,R,10,R,4',
  } */
}

/**
  @param {Array.<Array.<string>>} mx - '#' is where bot can move on
  @param {Object} bot - bot moves by '#' tiles, ignores X-sections and never turns back
  @param {Array.<number>} bot.c - bot coordinates
  @param {number} bot.d - bot direction (0 - N, 1 - E, 2 - S, 3 - W)
  @param {boolean} debug
  @return {string} csv, e.g. R,4,L,10,L,10
 **/
function drive(mx, bot , debug = false) {
  const mxRows = mx.length;
  const pathWayTile = '#',
    noWayTile = '.';
  const dirMap = {
    0: [0, -1],
    1: [1, 0],
    2: [0, 1],
    3: [-1, 0],
  };
  const path = [];
  let stepsCount = 0;

  const getTargetTile = (dir) => {
    const targetOffset = dirMap[dir];
    const targetCoords = [bot.c[0] + targetOffset[0], bot.c[1] + targetOffset[1]];
    const targetRowCols = targetCoords[1] < mxRows && targetCoords[1] >=0 ? mx[targetCoords[1]].length : 0;
    return [ targetCoords,
      targetCoords[1] >= 0
      && targetCoords[1] < mxRows
      && targetCoords[0] >= 0
      && targetCoords[0] < targetRowCols
      ? mx[targetCoords[1]][targetCoords[0]]
      : '-' ];
  };

  while (true) {
    const target = getTargetTile(bot.d);
    debug && console.log('BOT @', bot.c, bot.d);
    if (target[1] !== pathWayTile) {
      // rotate
      debug && console.log('NO WAY after', stepsCount);
      if (stepsCount) {
        debug && console.log('>>> SAVE', stepsCount);
        path.push(stepsCount);
        stepsCount = 0;
      }
      const target = {
        'R': getTargetTile((bot.d + 1) % 4),
        'L': getTargetTile( bot.d - 1 === -1 ? 3 : bot.d - 1 ),
      };
      let rotationCommand = null;
      if (target['R'][1] === pathWayTile) { rotationCommand = 'R'; bot.d = (bot.d + 1) % 4; }
      if (target['L'][1] === pathWayTile) { rotationCommand = 'L'; bot.d = bot.d - 1 === -1 ? 3 : bot.d - 1; }
      if (!rotationCommand) {
        debug && console.log('EXIT WITH', path);
        return path.join(',');
      }
      debug && console.log('>>> SAVE', rotationCommand);
      path.push(rotationCommand);
    } else {
      // move on
      ++stepsCount;
      debug && console.log('MOVE ON' ,stepsCount);
      bot.c = target[0];
    }
  }
}

function xform(input) {
  return input.split(",").map(Number);
}

function friendlyInput(input) {
  return input.join(',').slice(0,32);
}
