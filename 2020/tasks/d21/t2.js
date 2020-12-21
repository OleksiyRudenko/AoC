const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 'mxmxvkd,sqjhc,fvjkl',
  'ktpbgdn,pnpfjb,ndfb,rdhljms,xzfj,bfgcms,fkcmf,hdqkqhh', ]
  .map((expected, index) => ({
    input: INPUT[index],
    expected,
  }));
console.log(ruler());
const lastAnswer = runTests(main, testSet, [1], friendlyInput);
console.log(ruler('-'));
console.log("ANSWER", lastAnswer);
console.log(ruler());

function main(input) {
  console.log('FOOD COUNT', input.length);

  const allergensSet = [...new Set(input.map(dish => dish.allergens).flat())];
  console.log('Allergens:', allergensSet);
  const ingredientsSet = [...new Set(input.map(dish => dish.ingredients).flat())];
  console.log('ingredients:', ingredientsSet);

  const allergensMap = allergensSet
    .reduce((map, allergen) => {
      map[allergen] = null;
      return map;
    }, {});
  console.log('Allergen map', allergensMap);
  const ingredientsCount = input.reduce((counts, dish) => {
    dish.ingredients.forEach(ingr => {
      if (!counts[ingr]) {
        counts[ingr] = 1;
      } else {
        counts[ingr]++;
      }
      return counts;
    });
    return counts;
  }, {});
  console.log('Ingredients counts', ingredientsCount);

  /*
  const ingredientsMap = ingredientsSet
    .reduce((map, ingredient) => {
      map[ingredient] = [...allergensSet];
      return map;
      },
      {});
  console.log("Ingredients map", ingredientsMap);
  input.forEach(dish => {
    const { ingredients, allergens } = dish;
    ingredients.forEach(ingr => {
      ingredientsMap[ingr] = ingredientsMap[ingr]
        .filter(allerg => allergens.includes(allerg));
    });
  });
  console.log("Ingredients map", ingredientsMap);

  const nonAllergenic = [];
  for (let ingr in ingredientsMap) {
    if (ingredientsMap[ingr].length > 0) {
      nonAllergenic.push(ingr);
    }
  }

  console.log("Non-allregenic", nonAllergenic);

   */

  input.forEach(({ingredients, allergens}) => {
    allergens.forEach(allerg => {
      if (allergensMap[allerg] === null) {
        allergensMap[allerg] = [...ingredients];
      } else {
        allergensMap[allerg] = allergensMap[allerg]
          .filter(ingr => ingredients.includes(ingr));
      }
    });
  });
  console.log('Allergen map filtered', allergensMap);

  const allergenic = [...new Set(Object.values(allergensMap).flat())];
  console.log('Allergenic', allergenic);

  const nonAllergenic = ingredientsSet.filter(ingr => !allergenic.includes(ingr));
  console.log('Non-allergenic', nonAllergenic);

  const occurences =
    nonAllergenic.reduce((sum, ingr) => sum + ingredientsCount[ingr], 0);

  // part 2
  // allergensMap
  console.log('====================== PART 2 ======================');
  console.log('Allergen map filtered', allergensMap);

  let dry = false;
  const identifiedIngredients = [];
  while (!dry) {
    dry = true;
    for (let allerg in allergensMap) {
      if (allergensMap[allerg].length > 1) {
        allergensMap[allerg] = allergensMap[allerg]
          .filter(ingr => !identifiedIngredients.includes(ingr));
        console.log('Reduced ', allerg, allergensMap[allerg]);
      }
      if (allergensMap[allerg].length === 1) {
        // allergensMap[allerg] = allergensMap[allerg][0];
        identifiedIngredients.push(allergensMap[allerg][0]);
        console.log('Add unqiue for', allerg, allergensMap[allerg][0]);
      }
      if (allergensMap[allerg].length > 1) {
        dry = false;
        console.log('Still undry', allerg) ;
      }
    }
  }

  console.log('Identified ingrs', identifiedIngredients);
  console.log('Allergen map dried', allergensMap);

  const ingrList = Object.keys(allergensMap)
    .sort()
    .map(allerg => allergensMap[allerg])
    .flat()
    .join(",");
  console.log(':::', ingrList);

  return ingrList;
}

function friendlyInput(input) {
  const out = [];
  for (let i = 0; i < 4; i++) {
    const {ingredients, allergens} = input[i];
    out.push({
      ingredients: ingredients.slice(0, 10).join(" "),
      allergens: allergens.join(" "),
    });
  }
  return out;
}

/*
mxmxvkd -kfcds sqjhc -nhms (contains dairy, fish)
-trh fvjkl -sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd --sbzzf (contains fish)


 */
