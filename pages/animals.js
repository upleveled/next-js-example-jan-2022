import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setParsedCookie } from '../util/cookies';
import animalsDatabase from '../util/database';

const animalStyles = css`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
`;

export default function Animals(props) {
  const [likedArray, setLikedArray] = useState(props.likedAnimals);
  // This will not work, because
  // your component will also run in
  // the browser, and the browser
  // doesn't know about 'fs'
  //
  // Error message you would receive:
  // Module not found: Can't resolve 'fs'
  // useEffect(() => {
  //   fs.readFileSync('./about.js');
  // }, []);

  function toggleAnimalLike(id) {
    // 1. get the value of the cookie
    const cookieValue = getParsedCookie('likedAnimals') || [];

    // 2. update the cooke
    const existIdOnArray = cookieValue.some((cookieObject) => {
      return cookieObject.id === id;
    });

    let newCookie;
    if (existIdOnArray) {
      //  CASE = when the id is in the array => delete item
      //  cookieValue  [{id:3},{id:5} ]
      newCookie = cookieValue.filter((cookieObject) => {
        return cookieObject.id !== id;
      });
    } else {
      //  CASE = when the id is not in the array => add item
      //  cookieValue  [{id:3, stars: 5 },{id:5, stars: 12 }]
      newCookie = [...cookieValue, { id: id, stars: 0 }];
    }

    // 3. set the new value of the cookie
    setLikedArray(newCookie);
    setParsedCookie('likedAnimals', newCookie);
  }

  return (
    <Layout>
      <Head>
        <title>Animals</title>
        <meta description="A list of animals and their accessories" />
      </Head>
      <h1>Animals</h1>
      {props.animals.map((animal) => {
        // animal =  {
        //   id: '1',
        //   name: 'Tiny',
        //   age: 47,
        //   type: 'Dragon',
        //   accessory: 'Monacle',
        // },

        // likedAnimals = [{ id: "1" }, { id: "2" }];

        const animalIsLiked = likedArray.some((likedObject) => {
          return likedObject.id === animal.id;
        });

        return (
          <div key={`animal-${animal.id}`} css={animalStyles}>
            {/* Dynamic link, eg. /animals/1, /animals/2, etc */}
            <Link href={`/animals/${animal.id}`}>
              <a>
                {animal.name} is a {animal.type} with a {animal.accessory}
              </a>
            </Link>{' '}
            <button onClick={() => toggleAnimalLike(animal.id)}>
              {animalIsLiked ? '🧡' : '🖤'}
            </button>
          </div>
        );
      })}
    </Layout>
  );
}

// Code in getServerSideProps runs only in
// Node.js, and allows you to do fancy things:
// - Read files from the file system
// - Connect to a (real) database
//
// getServerSideProps is exported from your files
// (ONLY FILES IN /pages) and gets imported
// by Next.js
export function getServerSideProps(context) {
  const likedAnimalsOnCookies = context.req.cookies.likedAnimals || '[]';

  // if there is no likedAnimals cookie on the browser we store to an [] otherwise we get the cooke value and parse it
  const likedAnimals = JSON.parse(likedAnimalsOnCookies);
  // Important:
  // - Always return an object from getServerSideProps
  // - Always return a key in that object that is
  // called props

  // 1. get the cookies from the browser
  // 2. pass the cookies to the frontend
  return {
    props: {
      // In the props object, you can pass back
      // whatever information you want
      likedAnimals: likedAnimals,
      animals: animalsDatabase,
    },
  };
}
