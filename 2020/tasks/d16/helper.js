function isTicketValid(ticket, conditions) {
  return ticket.map(v => isValueAnyValid(v, conditions))
    .reduce((res, validity) => res && validity, true);
}


function matchFields(ticket, conditions) {
  return ticket.map(v => getMatchingFields(v, conditions));
}

function getMatchingFields(v, conditions) {
  return conditions
    .filter(({section ,ranges}) => {
      const t1 = v >= ranges[0][0] && v <= ranges[0][1];
      const t2 = v >= ranges[1][0] && v <= ranges[1][1];
      if (t1 || t2) return true;
      return false;
    })
    .map(({section}) => section);
}

function extractInvalidValues(ticket, conditions) {
  // neither condition is met
  console.log("T >>>", ticket, conditions);
  return ticket.filter(v => !isValueAnyValid(v, conditions));
}

function isValueAnyValid(v, conditions) {
  // console.log('>', v);
  for (let ci = 0; ci < conditions.length; ci++) {
    const ranges = conditions[ci].ranges;

    const t1 = v >= ranges[0][0] && v <= ranges[0][1];
    const t2 = v >= ranges[1][0] && v <= ranges[1][1];

    // console.log(conditions[ci].section, v, '?', ranges, t1, t2);
    if (t1 || t2) return true;
  }
  return false;
}

module.exports = { extractInvalidValues, isTicketValid, matchFields };
