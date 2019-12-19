const testSuite = require("./test-suite");
const T = require("./tools");
const mainInput = require("./i18--input");

// console.log('====================== ABANDONED, WRONG APPROACH ====================');

let testSet = testSuite.xform(xform, [
  {
    input: `##########################
#@..............ac.GI.b..#
###d#e#f################.#
###A#B#C###############..#
###g#h#i###############..#
###.#.#..##############..#
##########################`,
    expected: 81, //  a, c, f, i, d, g, b, e, h
  },
  {
    input: `########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`,
    expected: 86, // abcdef better than abcedf
    /*
    requires =
    f : DECA
    d : B
    e : CA
    b : A
    c : B
    a : null
    target = f
    path = ?
     */
  },
  {
    input: `########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################`,
    expected: 132, // bacdefeg
  },
  {
    input: `#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`,
    expected: 136, // a, f, b, j, g, n, h, d, l, o, e, p, c, i, k, m
  },
  {
    input: mainInput,
    expected: 0,
  },
]);

const lastAnswer = testSuite.run(main, testSet, T.matrix2lines, 1);

console.log("ANSWER X-1", lastAnswer);

function main(mx) {
  const start = findStart(mx, '@');

  console.log(T.matrix2lines(mx));
  console.log(start);

  // collect all nodes
  const mxClone = T.cloneMatrix(mx);
  const tree = squeezeEmptyCorridors(removeEmptyDeadEnds(dijkstra(mxClone, start)));

  console.log('TREE\n', tree.map(printNode).join("\n"));

  const entryPoints = [];

  const graph = tree.map(node => {
    node.n = [...node.children];
    if (node.parent !== null) {
      node.n.push(node.parent);
    }
    if (node.v === '@') {
      node.v = '.';
      entryPoints.push(node);
    }
    delete node.parent;
    delete node.c;
    delete node.children;
    return node;
  });

  console.log('GRAPH\n', graph.map(printNode).join("\n"));

  const paths = traverseGraph(graph, entryPoints[0]);

  return paths;
}

function traverseGraph(g, needleNode, keyStore = [], distanceAcc = 0) {
  // find all keys using BFS, skipping the keys we've got and their respectful doors
  const newKeyNodes = [];
  const blockedDoors = [];
  let visited = [ needleNode ];
  let queue = [...needleNode.n];

  while (queue.length) {
    const node = queue.shift();
    if (visited.includes(node)) {
      continue;
    }
    visited.push(node);
    // distance += node.w // TODO: set dist for this node based on parent
    let isSpecial = false, terminate = false;
    if (isKey(node.v)) {
      isSpecial = true;
      if (!keyStore.includes(node.v)) {
        newKeyNodes.push(node); // TODO: store distance
        terminate = true;
      }
    }
    if (isDoor(node.v)) {
      isSpecial = true;
      if (!keyStore.includes(door2key(node.v))) {
        blockedDoors.push(node); // TODO: store distance
        terminate = true;
      }
    }
    if (!terminate) {
      node.n.forEach(neigh => {
        if (!visited.includes(neigh)) {
          queue.push(neigh);
        }
      });
    }
  }

  // console.log('NEW KEYS', newKeyNodes.map(printNode));
  // console.log('BLOCKED DOORS', blockedDoors.map(printNode));

  const paths = [];

  /* at each key node:
   add key to the key store
   add distance
   move to a key node
   spawn if any keys to find yet
   return accumulated distance
   */
  newKeyNodes.forEach(kn => {
    const path = traverseGraph(g, kn, [...keyStore, kn.v]);

    paths.push([...keyStore, kn.v, ...path]);
  });

  return paths;
  // return collected distances

}

function deepCloneGraph(g) {

}

function dijkstra(mx, needle) {
  let nodes = [];
  let currentNodes = [{
    id: 0,
    v: '@',
    c: [...needle],
    w: 1,
    children: [],
    parent: null,
  }];
  mx[needle[1]][needle[0]] = '*';
  let nextNodes;
  let nodeCount = 0;

  while (currentNodes.length) {
    // console.log('');
    // console.log(T.matrix2lines(mx));
    nextNodes = [];
    currentNodes.forEach(node => {
      const targets = [
        [node.c[0], node.c[1]-1], // above
        [node.c[0], node.c[1]+1], // below
        [node.c[0]-1, node.c[1]], // to the left
        [node.c[0]+1, node.c[1]], // to the right
      ];
      const allTiles = targets.map(target => ({
        v: mx[target[1]][target[0]],
        c: [...target],
      }));
      const tiles = allTiles.filter(tile => tile.v !== '#' && tile.v !== '*');

      // console.log('NODE', node);
      // console.log('NEIGHBOURS', allTiles, tiles);

      tiles.forEach(tile => {
        const { v: targetTile, c: target } = tile;
        // console.log('FOUND', targetTile, target);
        const newNode = {
          id: ++nodeCount,
          v: targetTile,
          c: target,
          w: 1,
          children: [],
          parent: node,
        };
        mx[target[1]][target[0]] = '*';
        node.children.push(newNode);
        nextNodes.push(newNode);
      });
      nodes.push(node);
    });
    currentNodes = nextNodes;
  }

  return nodes;
}

function removeEmptyDeadEnds(nodes) {
  // remove empty dead ends
  let cleanNodes;
  let oldNodesCount = nodes.length + 1;
  while (oldNodesCount > nodes.length) {
    oldNodesCount = nodes.length;
    cleanNodes = [];
    nodes.forEach(node => {
      if (node.children.length === 0 && node.v === '.') {
        // skip it
      } else {
        node.children = node.children.filter(child => !(child.children.length === 0 && child.v === '.'));
        cleanNodes.push(node);
      }
    });
    nodes = cleanNodes;
  }
  return nodes;
}

function squeezeEmptyCorridors(nodes) {
  // if a '.' node has a single parent and a single child, both empty
  let cleanNodes;
  let squeezeDone = true;

  while (squeezeDone) {
    squeezeDone = false;
    cleanNodes = [];
    nodes.forEach(node => {
      if (node.v === '.' && node.children.length === 1 // I am empty and not a fork == 1 child
        && node.parent.v === '.' && node.parent.children.length === 1) { // my parent empty & I am the only child
        node.parent.children = [...node.children]; // pass my children to my parent
        node.children[0].parent = node.parent; // pass my parent to my only child
        node.parent.w++; // make my parent heavier
        squeezeDone = true; // re-scan
      } else {
        cleanNodes.push(node);
      }
    });

    nodes = cleanNodes;
  }

  return nodes;
}

function printNode(node) {
  const data = [
    padNumber(node.id), ': ',
    node.v,
    ' ( ', node.w, ' )',
    '   ',
    node.c && (' c[' + node.c.map(c => padNumber(c)).join(',') + ']'),
    node.parent && (' pid:' + node.parent.id),
    node.children && (' ch[' + node.children.map(ch => padNumber(ch.id)) + ']'),
    node.n && (' n[' + node.n.map(n => padNumber(n.id)) + ']'),
  ];
  return data.join('');
}

function padNumber(n, w = 3, filler = ' ') {
  return (n+'').padStart(w, filler);
}

function isKey(c) {
  return c>='a' && c<='z';
}

function isDoor(c) {
  return c>='A' && c<='Z';
}

function door2key(c) {
  return c.toLowerCase();
}

function findStart(map, needle = '@') {
  for (let r = map.length - 1; r >= 0; r--) {
    const row = map[r];
    for (let c = row.length - 1; c >= 0; c--) {
      if (row[c] === needle) {
        return [c, r];
      }
    }
  }
  return [null, null];
}

function xform(input) {
  return input.split("\n").map(s=>s.split(''));
}

