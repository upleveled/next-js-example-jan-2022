const animalFavoriteFoods = [
  {
    animal_id: 2, // Pete
    food_id: 4, // Burritos
  },
  {
    animal_id: 2, // Pete
    food_id: 3, // Cupcakes
  },
  {
    animal_id: 6, // Suchi
    food_id: 2, // Sushi
  },
  {
    animal_id: 5, // Lila
    food_id: 1, // Lasagna
  },
  {
    animal_id: 5, // Lila
    food_id: 3, // Cupcakes
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO animal_favorite_foods ${sql(
      animalFavoriteFoods,
      'animal_id',
      'food_id',
    )}
  `;
};

exports.down = async (sql) => {
  for (const animalFavoriteFood of animalFavoriteFoods) {
    await sql`
      DELETE FROM
        animal_favorite_foods
      WHERE
        animal_id = ${animalFavoriteFood.animal_id} AND
        food_id = ${animalFavoriteFood.food_id}
    `;
  }
};
