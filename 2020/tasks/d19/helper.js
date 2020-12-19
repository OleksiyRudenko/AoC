function parseRules(r, i) {
  const rules = [];

  r.split("\n").forEach(s => {
    let [index, tokens] = s.split(": ");
    if (tokens === undefined)
      console.log(s, ">>", index, ':', tokens);
    rules[index] = tokens
      .split(" ")
      .map(t => {
        if (t === "|") return "|";
        if (t[0] === "\"") return t[1];
        return +t;
      })
  });

  return rules;
}

module.exports = { parseRules };
