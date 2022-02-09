exports.up = async (sql) => {
  console.log('Creating table animals...');
  await sql`
    CREATE TABLE animals (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(20) NOT NULL,
      age integer NOT NULL,
      type varchar(30) NOT NULL,
      accessory varchar(30) NOT NULL
    );
  `;
};

exports.down = async (sql) => {
  console.log('Dropping table animals...');
  await sql`
    DROP TABLE animals
  `;
};
