import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';
import animalsDatabase from '../../util/database';

export default function SingleAnimal(props) {
  const [likedArray, setLikedArray] = useState(props.likedAnimals);

  // [{"id":"1","stars":0},{"id":"2","stars":0}]
  const currentAnimalObject = likedArray.find(
    (cookieObject) => cookieObject.id === props.animal.id,
  );

  console.log(currentAnimalObject);

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
          {props.animal.name} ({props.animal.type})
        </title>
        <meta
          description={`${props.animal.name} is a ${props.animal.type} with a ${props.animal.accessory}`}
        />
      </Head>
      <h1>
        {props.animal.name} ({props.animal.type})
      </h1>
      <Image
        src={`/unfortunately-foxes/${props.animal.id}.jpeg`}
        width="300"
        height="300"
      />
      <div>id: {props.animal.id}</div>
      <div>name: {props.animal.name}</div>
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
  console.log('db', animalsDatabase);

  const matchingAnimal = animalsDatabase.find((animal) => {
    return animal.id === animalId;
  });

  return {
    props: {
      likedAnimals,
      animal: matchingAnimal,
      // animalId: animalId,
    },
  };
}
