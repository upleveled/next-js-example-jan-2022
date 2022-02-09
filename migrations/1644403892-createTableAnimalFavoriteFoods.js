exports.up = async (sql) => {
  // Create a join table aka junction table
  await sql`
    CREATE TABLE animal_favorite_foods (
      PRIMARY KEY (animal_id, food_id),
      animal_id integer REFERENCES animals (id) ON DELETE CASCADE,
      food_id integer REFERENCES foods (id) ON DELETE CASCADE
    );
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE animal_favorite_foods
  `;
};
