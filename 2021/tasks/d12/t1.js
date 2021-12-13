const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
// const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 4304, 10, 19, 226, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [0], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  const graph = buildGraph(input);
  console.log(graph);
  /* console.log(cloneGraph(graph, 'd'));
  console.log(cloneGraph(graph)); */
  const paths = [];
  traverse(cloneGraph(graph), 'start', [], paths);
  console.log(paths);
  // unfold paths


  return paths.length;
}

function traverse(graph, fromNode, path = [], pathList) {
  console.log(fromNode, graph);
  if (fromNode === 'end') {
    pathList.push([...path, 'end']);
    return;
  }
  if (!graph[fromNode].e.length) {
    // nowhere to go further
    return;
  }
  const goto = graph[fromNode].e;
  const subGraph = cloneGraph(graph, graph[fromNode].multi ? '' : fromNode);
  // const paths = [];
  path = [...path, fromNode];
  goto.forEach(dest => {
    const subPath = traverse(cloneGraph(subGraph), dest, path, pathList);
    // if (subPath) paths.push([fromNode, ...subPath]);
  });
  return pathList;
}

function cloneGraph(graph, excludeNode = '') {
  const newGraph = {};
  Object.keys(graph).forEach(key => {
    if (key !== excludeNode) {
      newGraph[key] = {
        multi: graph[key].multi,
        e: graph[key].e.filter(node => node !== excludeNode),
      }
    }
  });
  return newGraph;
}

function buildGraph(edges) {
  const graph = {};
  edges.forEach(([n1, n2]) => {
    addEdge(graph, n1, n2);
    addEdge(graph, n2, n1);
  });
  // cleanup dead-ends
  return graph;
}

function addEdge(graph, n1, n2) {
  if (n1 === 'end') return;
  if (n2 === 'start') return;
  if (!graph[n1]) graph[n1] = { multi: undefined, e: []};
  graph[n1] = {
    multi: n1.toUpperCase() === n1,
    e: [...graph[n1].e, n2],
  }
  return graph;
}

function friendlyInput(input) {
  return input //.map(row => row.join('-')).join("\n");
}
