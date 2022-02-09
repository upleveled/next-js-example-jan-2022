const foods = [
  {
    // id: 1,
    name: 'Lasagna',
    type: 'Pasta',
  },
  {
    // id: 2,
    name: 'Sushi',
    type: 'Asian',
  },
  {
    // id: 3,
    name: 'Cupcakes',
    type: 'Cake',
  },
  {
    // id: 4,
    name: 'Burritos',
    type: 'Mexican',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO foods ${sql(foods, 'name', 'type')}
  `;
};

exports.down = async (sql) => {
  for (const food of foods) {
    await sql`
      DELETE FROM
        foods
      WHERE
        name = ${food.name} AND
        type = ${food.type}
    `;
  }
};
