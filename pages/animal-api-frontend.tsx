import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Animal } from '../util/database';
import { AnimalsResponseBodyGet } from './api/animals';
import { AnimalResponseBody } from './api/animals/[animalId]';

export default function About() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState(1);
  const [type, setType] = useState('');
  const [accessory, setAccessory] = useState('');

  // State Variable with the id of the animal on editMode
  const [idEditAnimalId, setOnEditAnimalId] = useState<number>();
  // State Variables for the on Edit inputs
  const [nameOnEdit, setNameOnEdit] = useState('');
  const [ageOnEdit, setAgeOnEdit] = useState(1);
  const [typeOnEdit, setTypeOnEdit] = useState('');

  const [error, setError] = useState('');

  async function deleteAnimal(id: number) {
    const deleteResponse = await fetch(`/api/animals/${id}`, {
      method: 'DELETE',
    });
    const deleteResponseBody =
      (await deleteResponse.json()) as AnimalResponseBody;

    if ('error' in deleteResponseBody) {
      setError(deleteResponseBody.error);
      return;
    }

    const newAnimalsList = animals.filter((animal) => {
      return deleteResponseBody.animal.id !== animal.id;
    });

    setAnimals(newAnimalsList);
  }

  async function createAnimal() {
    if (!name || !age || !type || !accessory) {
      console.log('I need more data to create');
      return;
    }

    const createResponse = await fetch(`/api/animals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        animal: {
          firstName: name,
          age: age,
          type: type,
          accessory: accessory,
        },
      }),
    });

    const createResponseBody =
      (await createResponse.json()) as AnimalResponseBody;

    if ('error' in createResponseBody) {
      setError(createResponseBody.error);
      return;
    }

    const newAnimalsList = [...animals, createResponseBody.animal];

    setAnimals(newAnimalsList);
  }

  async function updateAnimal(id: number) {
    if (!nameOnEdit || !ageOnEdit || !typeOnEdit) {
      console.log('I need more data to update');
      return;
    }
    const putResponse = await fetch(`/api/animals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        animal: {
          firstName: nameOnEdit,
          age: ageOnEdit,
          type: typeOnEdit,
        },
      }),
    });
    const putResponseBody = (await putResponse.json()) as AnimalResponseBody;

    if ('error' in putResponseBody) {
      setError(putResponseBody.error);
      return;
    }

    const updatedAnimalList = animals.map((animal) => {
      if (animal.id === putResponseBody.animal.id) {
        return putResponseBody.animal;
      } else {
        return animal;
      }
    });

    setAnimals(updatedAnimalList);
  }

  useEffect(() => {
    const getAnimals = async () => {
      const readResponse = await fetch('/api/animals');
      const readResponseBody =
        (await readResponse.json()) as AnimalsResponseBodyGet;
      setAnimals(readResponseBody.animals);
    };

    getAnimals().catch(() => {});
  }, []);

  if (error) {
    return (
      <Layout>
        <Head>
          <title>Error</title>
          <meta name="description" content="This is the frontend of my api" />
        </Head>

        <h1>Error</h1>
        {error}
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Api Frontend</title>
        <meta name="description" content="This is the frontend of my api" />
      </Head>

      <h1>Api Frontend</h1>

      <label>
        Name:
        <input
          onChange={(event) => setName(event.currentTarget.value)}
          value={name}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          onChange={(event) => setAge(parseInt(event.currentTarget.value))}
          value={age}
          type="number"
        />
      </label>
      <br />
      <label>
        Type:
        <input
          onChange={(event) => setType(event.currentTarget.value)}
          value={type}
        />
      </label>
      <br />
      <label>
        Accessory:
        <input
          onChange={(event) => setAccessory(event.currentTarget.value)}
          value={accessory}
        />
      </label>
      <button onClick={() => createAnimal()}>Create Animal</button>
      <br />

      {animals.map((animal) => {
        const isDisabled = idEditAnimalId !== animal.id;
        return (
          <Fragment key={animal.id}>
            <br />
            <span>ID: {animal.id} </span>
            <input
              onChange={(event) => setNameOnEdit(event.currentTarget.value)}
              value={isDisabled ? animal.firstName : nameOnEdit}
              disabled={isDisabled}
            />
            <input
              type="number"
              onChange={(event) =>
                setAgeOnEdit(parseInt(event.currentTarget.value))
              }
              value={isDisabled ? animal.age : ageOnEdit}
              disabled={isDisabled}
            />
            <input
              onChange={(event) => setTypeOnEdit(event.currentTarget.value)}
              value={isDisabled ? animal.type : typeOnEdit}
              disabled={isDisabled}
            />
            <span>{animal.accessory} </span>

            {isDisabled ? (
              <button
                onClick={() => {
                  setOnEditAnimalId(animal.id);
                  setNameOnEdit(animal.firstName);
                  setAgeOnEdit(animal.age);
                  setTypeOnEdit(animal.type);
                }}
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => {
                  updateAnimal(animal.id).catch(() => {});
                  setOnEditAnimalId(undefined);
                }}
              >
                Save
              </button>
            )}
            <button
              onClick={() => {
                deleteAnimal(animal.id).catch(() => {});
              }}
            >
              Delete Animal
            </button>
          </Fragment>
        );
      })}
    </Layout>
  );
}
