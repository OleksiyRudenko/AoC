let src = `Step G must be finished before step L can begin.
Step X must be finished before step U can begin.
Step W must be finished before step H can begin.
Step M must be finished before step S can begin.
Step Z must be finished before step N can begin.
Step K must be finished before step U can begin.
Step V must be finished before step B can begin.
Step L must be finished before step P can begin.
Step U must be finished before step S can begin.
Step D must be finished before step Q can begin.
Step C must be finished before step Q can begin.
Step O must be finished before step N can begin.
Step E must be finished before step P can begin.
Step J must be finished before step Q can begin.
Step R must be finished before step A can begin.
Step P must be finished before step Q can begin.
Step H must be finished before step F can begin.
Step I must be finished before step Y can begin.
Step F must be finished before step T can begin.
Step T must be finished before step Q can begin.
Step S must be finished before step B can begin.
Step A must be finished before step N can begin.
Step B must be finished before step N can begin.
Step Q must be finished before step Y can begin.
Step N must be finished before step Y can begin.
Step G must be finished before step S can begin.
Step S must be finished before step Q can begin.
Step A must be finished before step Y can begin.
Step Q must be finished before step N can begin.
Step Z must be finished before step K can begin.
Step F must be finished before step A can begin.
Step F must be finished before step Q can begin.
Step M must be finished before step V can begin.
Step B must be finished before step Y can begin.
Step A must be finished before step Q can begin.
Step F must be finished before step B can begin.
Step S must be finished before step N can begin.
Step G must be finished before step B can begin.
Step C must be finished before step T can begin.
Step Z must be finished before step D can begin.
Step P must be finished before step N can begin.
Step Z must be finished before step P can begin.
Step K must be finished before step O can begin.
Step R must be finished before step P can begin.
Step J must be finished before step R can begin.
Step W must be finished before step B can begin.
Step T must be finished before step S can begin.
Step M must be finished before step B can begin.
Step K must be finished before step B can begin.
Step I must be finished before step S can begin.
Step H must be finished before step A can begin.
Step O must be finished before step J can begin.
Step H must be finished before step I can begin.
Step I must be finished before step N can begin.
Step D must be finished before step J can begin.
Step P must be finished before step B can begin.
Step T must be finished before step N can begin.
Step D must be finished before step A can begin.
Step M must be finished before step D can begin.
Step R must be finished before step I can begin.
Step U must be finished before step Y can begin.
Step P must be finished before step S can begin.
Step R must be finished before step B can begin.
Step G must be finished before step C can begin.
Step U must be finished before step C can begin.
Step O must be finished before step F can begin.
Step Z must be finished before step E can begin.
Step B must be finished before step Q can begin.
Step E must be finished before step J can begin.
Step X must be finished before step B can begin.
Step O must be finished before step A can begin.
Step H must be finished before step Y can begin.
Step T must be finished before step Y can begin.
Step U must be finished before step H can begin.
Step A must be finished before step B can begin.
Step D must be finished before step Y can begin.
Step X must be finished before step D can begin.
Step V must be finished before step U can begin.
Step L must be finished before step J can begin.
Step G must be finished before step X can begin.
Step Z must be finished before step J can begin.
Step L must be finished before step R can begin.
Step U must be finished before step F can begin.
Step O must be finished before step S can begin.
Step F must be finished before step S can begin.
Step C must be finished before step F can begin.
Step L must be finished before step I can begin.
Step C must be finished before step I can begin.
Step P must be finished before step Y can begin.
Step R must be finished before step H can begin.
Step P must be finished before step I can begin.
Step J must be finished before step B can begin.
Step D must be finished before step S can begin.
Step C must be finished before step E can begin.
Step W must be finished before step J can begin.
Step D must be finished before step T can begin.
Step G must be finished before step D can begin.
Step Z must be finished before step A can begin.
Step U must be finished before step R can begin.
Step P must be finished before step T can begin.
Step C must be finished before step Y can begin.`.split("\n")
  .map(s => [s.slice(5,6), s.slice(36,37)])
  .sort((p1, p2) => p1[0] < p2[0] ? -1 : 1)
  .reduce((acc, [parent, child]) => {
    if (!acc[parent]) {
      acc[parent] = {
        c: [child],
        p: [],
      }
    } else acc[parent].c.push(child);
    if (!acc[child]) {
      acc[child] = {
        c: [],
        p: [parent],
      }
    } else acc[child].p.push(parent);
    return acc;
  }, {});

let stack = [];

console.log(src);

// attempt 1.
// candidates = collect parentless; sort; result.push(c[0]); destroy links; repeat

while (Object.keys(src).length) {
  let candidates = Object.entries(src).reduce((acc, [k, n]) => {
    if (n.p.length === 0) acc.push(k);
    return acc;
  }, []).sort();
  console.log(candidates);
  let go = candidates[0];
  stack.push(go);
  src[go].c.forEach(child => {
    src[child].p = src[child].p.filter(p => p!==go);
  });
  delete src[go];
  console.log(src);

  console.log(stack);
}

console.log('ANSWER:', stack.join(''));
