import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../../util/cookies';

const animalsDatabase = [
  {
    id: '1',
    name: 'Tiny',
    age: 47,
    type: 'Dragon',
    accessory: 'Monacle',
  },
  {
    id: '2',
    name: 'Pete',
    age: 4,
    type: 'Iguana',
    accessory: 'Top Hat',
  },
  {
    id: '3',
    name: 'Randolph',
    age: 9,
    type: 'Parakeet',
    accessory: 'Ring',
  },
  {
    id: '4',
    name: 'George',
    age: 2,
    type: 'Tiger',
    accessory: 'Gold Chain',
  },
  {
    id: '5',
    name: 'Lila',
    age: 17,
    type: 'Monkey',
    accessory: 'Covid Mask',
  },
  {
    id: '6',
    name: 'Suchi',
    age: 20,
    type: 'Bunny',
    accessory: 'Sword',
  },
  {
    id: '7',
    name: 'Susi',
    age: 28,
    type: 'Wombat',
    accessory: 'Cane',
  },
  {
    id: '8',
    name: 'Lulu',
    age: 21,
    type: 'Dog',
    accessory: 'Cane',
  },
];

export default function SingleAnimal(props) {
  const [likedArray, setLikedArray] = useState(props.likedAnimals);

  // [{"id":"1","stars":0},{"id":"2","stars":0}]
  const currentAnimalObject = likedArray.find(
    (cookieObject) => cookieObject.id === props.animal.id,
  );

  function starsCountUp() {
    // because we render the button only when is liked then we can be sure the object is always on the cooke
    console.log('stars up');
    // 1. get the current cookie value
    const cookieValue = getParsedCookie('likedAnimals') || [];
    // 2. update the stars count to +1
    const newCookie = cookieValue.map((cookieObject) => {
      // if is the object of the animal on this page update stars
      if (cookieObject.id === props.animal.id) {
        return { ...cookieObject, stars: cookieObject.stars + 1 };
      } else {
        // if is not the object of the animal on this page don't do anything
        return cookieObject;
      }
    });

    // 3. update cookie and state
    setLikedArray(newCookie);
    setParsedCookie('likedAnimals', newCookie);
  }

  return (
    <Layout>
      <Head>
        <title>
          {props.animal.firstName} ({props.animal.type})
        </title>
        <meta
          name="description"
          content={`${props.animal.firstName} is a ${props.animal.type} with a ${props.animal.accessory}`}
        />
      </Head>
      <h1>
        {props.animal.firstName} ({props.animal.type})
      </h1>
      <Image
        src={`/unfortunately-foxes/${props.animal.id}.jpeg`}
        width="300"
        height="300"
      />
      <div>id: {props.animal.id}</div>
      <div>name: {props.animal.firstName}</div>
      <div>age: {props.animal.age}</div>
      <div>type: {props.animal.type}</div>
      <div>accessory: {props.animal.accessory}</div>
      {currentAnimalObject ? (
        <button onClick={() => starsCountUp()}>
          stars: {currentAnimalObject.stars}{' '}
        </button>
      ) : (
        'not followed'
      )}
    </Layout>
  );
}

// The parameter `context` gets passed from Next.js
// and includes a bunch of information about the
// request
export function getServerSideProps(context) {
  const likedAnimalsOnCookies = context.req.cookies.likedAnimals || '[]';

  // if there is no likedAnimals cookie on the browser we store to an [] otherwise we get the cooke value and parse it
  const likedAnimals = JSON.parse(likedAnimalsOnCookies);

  // This is the variable that we get from the URL
  // (anything after the slash)
  const animalId = context.query.animalId;
  const animal = animalsDatabase.find(
    (animalInDatabase) => animalId === animalInDatabase.id,
  );

  return {
    props: {
      likedAnimals,
      animal: animal,
    },
  };
}
