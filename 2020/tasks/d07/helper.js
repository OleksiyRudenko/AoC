/*
Structure
 [
   [container, [
       [count, contents],
       [count, contents]
     ]
 ]

 */

function findContainers(needle, superSet) {
  return superSet.reduce(
    (containers, entry) => {
      // console.log(">>", entry, containers);
      entry[1].forEach(contents => {
        let contains = false;
        if (contents[0] && contents[1] === needle)
          contains = true;
        if (contains) containers.push(entry[0]);
        // console.log(contains, contents, entry[0]);
      });
      return containers;
    }, []
  );
}

function findContents(needle, superSet) {
  const entry = superSet.find(e => e[0] === needle);
  if (!entry) {
    console.log("FAILED TO FIND", needle);
  }
  return entry ? entry[1].filter(bag => bag[0]) : [];
}

module.exports = { findContainers,findContents };
