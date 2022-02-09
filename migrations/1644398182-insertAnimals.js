const animals = [
  {
    // id: 1,
    first_name: 'Tiny',
    age: 47,
    type: 'Dragon',
    accessory: 'Monacle',
  },
  {
    // id: 2,
    first_name: 'Pete',
    age: 4,
    type: 'Iguana',
    accessory: 'Top Hat',
  },
  {
    // id: 3,
    first_name: 'Randolph',
    age: 9,
    type: 'Parakeet',
    accessory: 'Ring',
  },
  {
    // id: 4,
    first_name: 'George',
    age: 2,
    type: 'Tiger',
    accessory: 'Gold Chain',
  },
  {
    first_name: 'Lila',
    age: 17,
    type: 'Monkey',
    accessory: 'Covid Mask',
  },
  {
    first_name: 'Suchi',
    age: 20,
    type: 'Bunny',
    accessory: 'Sword',
  },
  {
    first_name: 'Susi',
    age: 28,
    type: 'Wombat',
    accessory: 'Cane',
  },
  {
    first_name: 'Lulu',
    age: 21,
    type: 'Dog',
    accessory: 'Cane',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO animals ${sql(
      animals,
      'first_name',
      'age',
      'type',
      'accessory',
    )}
  `;
};

exports.down = async (sql) => {
  for (const animal of animals) {
    await sql`
      DELETE FROM
        animals
      WHERE
        first_name = ${animal.first_name} AND
        age = ${animal.age} AND
        type = ${animal.type} AND
        accessory = ${animal.accessory}
    `;
  }
};
