const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { isTicketValid, matchFields } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 0, 953713095011, 0, ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main({conditions, ticket, ntickets}) {
  // valid ntickets
  const valids = ntickets
    .filter(ticket => isTicketValid(ticket, conditions));
  // console.log(valids);

  // identify matching conditions
  cSets = valids.map(ticket => matchFields(ticket, conditions));
  // console.log('Tickets fields', cSets);
  // in each position keep only common
  let ticketStructure = [];
  for (let fcount = 0; fcount < cSets[0].length; fcount++) {
    const ifields = cSets.map(set => set[fcount]);
    console.log(ifields);
    const ofields = ifields.reduce((oset, fields) => {
      return oset.filter(f => fields.includes(f));
    });
    ticketStructure.push(ofields);
  }
  console.log('Ticket structure', ticketStructure);

  // if any fields+ remain then keep unique only
  const lonelyFields = [];
  while (!isDry(ticketStructure)) {
    console.log("DRYING", ticketStructure);
    for (let i = 0; i < ticketStructure.length; i++) {
      if (ticketStructure[i].length === 1) {
        lonelyFields.push(ticketStructure[i][0]);
      }
    }
    console.log(' - Lonely fields', lonelyFields);
    // remove lonelies from remaining
    ticketStructure = ticketStructure
      .map(entries => {
        return (entries.length === 1)
          ? entries
          : entries.filter(e => !lonelyFields.includes(e))
      });
    console.log(" = Dried", ticketStructure);
  }

  ticketStructure = ticketStructure.flat();
  console.log('=== Ticket structure', ticketStructure);

  // console.log("================", ticket);

  const requiredFieldsIndices = ticketStructure
    .map((fname, idx) => {
      return fname.match(/^departure/) ? idx : undefined
    });

  console.log('=== Ticket key fields', requiredFieldsIndices);

  return requiredFieldsIndices
    .map(v => v ? ticket[v] : v)
    .reduce((mul, v) =>
      v ? mul * v : mul,
      1) ;
}

function isDry(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].length > 1) return false;
  }
  return true;
}

function friendlyInput({conditions, ticket, ntickets}) {
  return ""; /*{
    conditions: conditions.slice(0, 1),
    ticket: ticket.slice(0, 10),
    ntickets: ntickets.slice(0, 1),
  }; */
}
