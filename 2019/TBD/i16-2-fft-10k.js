let input =
  // `12345678` // // 01029498 after 4 iterations
  // `80871224585914546619083218645595` // p1 24176176 | p2 84462026
  // `19617804207202209144916044189917` // p1 73745418 | p2 78725270
  `69317163492948606335995924319873` // p1 52432133 | p2 53553731
  // `59762574510031092870627555978901048140761858379740610694074091049186715780458779281173757827279664853239780029412670100985236587608814782710381775353184676765362101185238452198186925468994552552398595814359309282056989047272499461615390684945613327635342384979527937787179298170470398889777345335944061895986118963644324482739546009761011573063020753536341827987918039441655270976866933694280743472164322345885084587955296513566305016045735446107160972309130456411097870723829697443958231034895802811058095753929607703384342912790841710546106752652278155618050157828313372657706962936077252259769356590996872429312866133190813912508915591107648889331`
  // p1 77038830 | p2
  .split("").map(e=>+e);

console.log('Initial', input.join('').slice(0,8));

for (let i = 0; i < 100; i++) {
  input = fft(input);
  console.log('PHASE', i+1, input.join('').slice(0,8));
}

console.log('ANSWER 16-1', input.join('').slice(0,8));

function fft(input) {
  let inLen = input.length;
  const maxIter = inLen * 10000;
  const output = [];
  for (let i = 0; i < inLen; i++) {
    // skip n+1-1 items (mult 0)
    // add  next n+1 items (mult 1)
    // skip next n+1 items (mult 0)
    // sub next n+1 items (mult -1)
    // skip 1 item (mult 0)
    let newV = 0;
    let subset;

    let superBase = i%inLen + 1;
    let base = superBase - 1;
    let baseEnd = base + superBase;
    let factor = 1;

    subset = input.slice(base, baseEnd);
    while (subset.length) {
      newV += subset.reduce((acc, v) => acc+v,0) * factor;
      // console.log('- MULT', factor, [base, baseEnd], subset);

      base += (superBase)*2;
      baseEnd = base + superBase;
      factor = factor === 1 ? -1 : 1;
      subset = input.slice(base, baseEnd);
    }

    const s = newV+'';
    const r = +s[s.length-1];
    // console.log('- RES', s, r);
    output.push(r);
  }
  return output;
}

console.log();
