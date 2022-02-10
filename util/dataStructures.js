export function getReducedAnimalWithFoods(animalFavoriteFoods) {
  const animalWithFoods = {
    id: animalFavoriteFoods[0].animalId,
    firstName: animalFavoriteFoods[0].animalFirstName,
    age: animalFavoriteFoods[0].animalAge,
    type: animalFavoriteFoods[0].animalType,
    accessory: animalFavoriteFoods[0].animalAccessory,
    foods: animalFavoriteFoods.map((animalFavoriteFood) => {
      return {
        id: animalFavoriteFood.foodId,
        name: animalFavoriteFood.foodName,
        type: animalFavoriteFood.foodType,
      };
    }),
  };

  return animalWithFoods;
}
