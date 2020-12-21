const path = require("path");
const { ruler, gcd, lcm, sum, sort09, max, min, makeMatrix, matrix2lines, cloneMatrix, makeRecombinations, } =
  require('../../../common/helpers');
const runTests = require("../../../common/test-runner");
const INPUT = require("./input");
const { helper } = require("./helper");
console.log(path.basename(__filename));

const testSet = [ 5, 2380, ]
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

  return occurences;
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
