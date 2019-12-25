const testSuite = require("../common/test-suite");
const VM = require("../common/vm");
const INPUT = require("./i25--input");

let testSet = testSuite.xform(xform, [
  {
    input: INPUT,
    expected: 537165825,
  },
]);

let superCount = 0;
let shuffleState = [];

const lastAnswer = testSuite.run(main, testSet, friendlyInput, 1);

// console.log("ANSWER 25-1", lastAnswer);
function main(input) {
  const vm = new VM("R", input, [], false);
  const commands = [
    'inv',              // Hull breach: N+,S+,W
    'north',            // Kitchen: N,E,S
    'take polygon',
    'north',            // Corridor: S (back)
    'take astrolabe',
    'south',            // Kitchen
    'east',             // Observatory: W, photons
    // // 'take photons',
    'west',             // Kitchen
    'south',             // Hull breach: NSW
    'west',              // Gift Wrapping: NE(HullB)W, hologram
    'take hologram',
    'north',            // Warp Drive Maint: NES(GiftW), infinite loop
    // // 'take infinite loop',
    'north',            // Crew Quarters: WS(WD Maint), prime
    'take prime number',
    'west',             // Navigation: E(Crew Q), escape pod
    // // 'take escape pod',
    'east', // CrewQ
    'south', // WD Maint
    'east',             // Engineering: W(WD Maint), laws code
    'take space law space brochure',
    'west', // WD Maint
    'south', // GWrap
    'west',  // Hot chock: E(Gwrap)SW
    'west', // Passages: E(Hot choc)
    'east', // Hot choc
    'south', // Stables: N(hot choc)
    'north', // HotChoc
    'east', // GiftW
    'east',  // Hull


    'south',            // Storage: N(Hull)E+S+, molten lava
    // // 'take molten lava',
    'east',             // Science lab: W(Storage)
    'take weather machine',
    'west',             // Storage
    'south',            // Arcade: N(Storage)S+W, manifold
    'take manifold',
    'south',            // Holodeck: N(Arcade)
    // // 'take giant electromagnet',
    'north',            // Arcade
    'west',             // Sick bay: NE(Arcade), mouse
    'take mouse',
    'north',            // Hallway: NS(Sick bay)
    'north',            // Security checkpoint: ES
    'east',             // WeighRoom: W(SecCP)
    'inv',
  ];
  let res;

  // collect all items, go to Security Checkpoint
  while (commands.length) {
    const command = commands.shift();
    res = vm.run([...str2int(command)]);
    // console.log(ints2str(res));
  }


  const items = [
    'manifold',
    'weather machine',
    'prime number',
    'polygon',
    'astrolabe',
    'mouse',
    'hologram',
    'space law space brochure',
  ];

  // drop item at a time, enter weighing room
  res = vm.run([...str2int('east')]);
  console.log(ints2str(res));

  const src = [1,2,3,];
  const srcLen = src.length;
  console.log('SHUFFLE', src);
  traverseRecombinations([], src, srcLen);

  console.log('=========== FIND SUPER HEAVY ITEMS =============');
  // drop all
  let dropAll = items.map(item => str2int('drop ' + item)).flat();
  res = vm.run(dropAll);

  // weigh one by one
  items.forEach(item => {
    res = vm.run([...str2int('take '+item)]);
    // res = vm.run([...str2int('inv')]);
    // console.log(ints2str(res));
    // test weight
    res = vm.run([...str2int('east')]);
    const responseStr = ints2str(res);
    const weight = responseStr.match(/ship are (\w+)/m)[1];
    console.log(item, 'Others are', weight);
    res = vm.run([...str2int('drop '+item)]);
  });

  console.log('=============== INVENTORY MUST BE EMPTY =========');
  // drop all
  dropAll = items.map(item => str2int('drop ' + item)).flat();
  res = vm.run(dropAll);

  console.log('=============== BALANCING ==================');

  const lightItems = items; // items.filter(item => item !== 'space law space brochure');

  try {
    traverseItems([], lightItems, lightItems.length, vm, lightItems);
  } catch (e) {
    return 537165825;
  }

  return res;
}

function traverseItems(acc, rest, n, vm, allItems) {
  let last = null;
  if (acc.length) {
    last = acc[acc.length - 1];
    if (++superCount % 100 === 0) {
      console.log(superCount);
    }

    let res;

    // test weight
    res = vm.run([...str2int('east')]);
    const responseStr = ints2str(res);
    const matches = responseStr.match(/ship are (\w+)/m);
    if (!matches) {
      console.log('========================', responseStr);
      console.log('========================', res);
      throw new Error('MATCH');
    }
    const weight = matches[1];
    // console.log('= RESULT', weight, 'FOR', acc.join(', '));

    if (weight === 'lighter') {
      // drop the last item
      res = vm.run([...str2int('drop ' + acc[acc.length-1])]);
      // console.log('- DROP', acc[acc.length - 1]);

      return;
    } // discontinue when items in inventory are heavier
    if (weight !== 'heavier' && weight !== 'lighter') {
      console.log('========================', responseStr);
      throw new Error('MATCH');
    }
  } else {
    // console.log('EMPTY');
  }
  if (n) {
    for (let i = 0; i < rest.length; i++) {
      if (acc.length === 0) {
        // acc empty
      }
      const others = [...rest];
      const nextItem = others.splice(i, 1)[0];

      // take item
      let res = vm.run([...str2int('take ' + nextItem)]);
      // console.log('+ ADD', nextItem, 'TO', acc.join(', '));
      // console.log('RESPONSE', ints2str(res));

      traverseItems([...acc, nextItem], others, n-1, vm, allItems);
    }
  } else {
    console.log('FULL DECK');
    // finalAcc.push(acc);
  }
  if (last) {
    // remove item before going level up
    let res = vm.run([...str2int('drop ' + last)]);
    // console.log('- POP', last);
  }
}

function traverseRecombinations(acc, rest, n) {
  let last = null;
  if (acc.length) {
    last = acc[acc.length-1];
    const heavier = (acc[acc.length-1] === 3);
    console.log('= ITERATION global', arr2str(shuffleState), '==', arr2str(acc), 'LAST ITEM IS HEAVY', heavier);
    if (heavier) { // discontinue heavier line
      const dropped = acc[acc.length-1];

      // remove from global state
      const idx = shuffleState.findIndex(item => item === dropped);
      shuffleState.splice(idx, 1);

      console.log('- DROP', dropped, '>', arr2str(shuffleState));
      return;
    }
  } else {
    // console.log('EMPTY, DROP ALL');
  }
  if (n) {
    for (let i = 0; i < rest.length; i++) {
      if (acc.length === 0) {
        console.log('0 ACC EMPTY. Global === ', arr2str(shuffleState));
      }
      const others = [...rest];
      const nextItem = others.splice(i, 1)[0];
      shuffleState.push(nextItem);
      console.log('+ ADD ITEM', nextItem, 'TO', arr2str(acc), '>', arr2str(shuffleState));
      traverseRecombinations([...acc, nextItem], others, n-1);
    }
  } else {
    console.log('>>>> FULL DECK');
    // finalAcc.push(acc);
  }
  if (last) {
    const clone = [...shuffleState];
    const idx = shuffleState.findIndex(e => e === last);
    const popped = last;
    shuffleState.splice(idx, 1);
    console.log('- POP', popped, 'FROM', arr2str(clone), '>', arr2str(shuffleState));
  }
}

function arr2str(arr, delim = '') {
  return '[' + arr.join(delim) + ']';
}

function str2int(s, append = 10) {
  const res = [...s].map(ch=>ch.charCodeAt(0));
  if (append) res.push(append);
  return res;
}

function ints2str(arr) {
  return arr.map(e => String.fromCharCode(e)).join('');
}

function xform(input) {
  return input.split(",").map(Number);
}

function friendlyInput(input) {
  return input.join('').slice(0,32);
}
