-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create animals table
CREATE TABLE animals (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(20) NOT NULL,
  age integer NOT NULL,
  type varchar(30) NOT NULL,
  accessory varchar(30) NOT NULL
);

-- Insert some animals (C in CRUD - Create)
INSERT INTO animals
  (first_name, age, type, accessory)
VALUES
  ('Tiny', 47, 'Dragon', 'Monacle'),
  ('Pete', 4, 'Iguana', 'Top Hat'),
  ('Randolph', 9, 'Parakeet', 'Ring'),
  ('George', 2, 'Tiger', 'Gold Chain'),
  ('Lila', 17, 'Monkey', 'Covid Mask'),
  ('Suchi', 20, 'Bunny', 'Sword'),
  ('Susi', 28, 'Wombat', 'Cane'),
  ('Lulu', 21, 'Dog', 'Cane');


-- Read some animals (R in CRUD - Read)
SELECT * FROM animals;
