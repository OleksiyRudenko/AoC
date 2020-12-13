const input = [
  `939
7,13,x,x,59,x,31,19`,
  `1000303
41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,541,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,983,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19`,
]
  .map(variant => {
      let [ts, services] = variant.split("\n");
      return [
            +ts,
            services.split(",")
              .filter(e => e !== 'x')
              .map(bus => +bus)
          ];
  }
  );

module.exports = input;
