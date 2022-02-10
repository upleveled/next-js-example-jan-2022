import { getReducedAnimalWithFoods } from '../dataStructures';

test('reduces animal favorite foods', () => {
  const animalFavoriteFoods = [
    {
      animalId: 2,
      animalFirstName: 'Pete',
      animalAge: 4,
      animalType: 'Iguana',
      animalAccessory: 'Top Hat',
      foodId: 3,
      foodName: 'Cupcakes',
      foodType: 'Cake',
    },
    {
      animalId: 2,
      animalFirstName: 'Pete',
      animalAge: 4,
      animalType: 'Iguana',
      animalAccessory: 'Top Hat',
      foodId: 4,
      foodName: 'Burritos',
      foodType: 'Mexican',
    },
  ];

  expect(getReducedAnimalWithFoods(animalFavoriteFoods)).toStrictEqual({
    id: 2,
    firstName: 'Pete',
    age: 4,
    type: 'Iguana',
    accessory: 'Top Hat',
    foods: [
      { id: 3, name: 'Cupcakes', type: 'Cake' },
      { id: 4, name: 'Burritos', type: 'Mexican' },
    ],
  });

  // Jest snapshots may be helpful if you are
  // writing a lot of data structures by hand
  expect(getReducedAnimalWithFoods(animalFavoriteFoods)).toMatchSnapshot();
});
