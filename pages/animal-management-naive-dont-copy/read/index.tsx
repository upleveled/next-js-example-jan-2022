import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { Animal, getAnimals } from '../../../util/database';

const animalStyles = css`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
`;

type Props = {
  animals: Animal[];
};

export default function Animals(props: Props) {
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

  return (
    <Layout>
      <Head>
        <title>Animals</title>
        <meta
          name="description"
          content="A list of animals and their accessories"
        />
      </Head>
      <h1>Animals</h1>
      {props.animals.map((animal) => {
        return (
          <div key={`animal-${animal.id}`} css={animalStyles}>
            {/* Dynamic link, eg. /animals/1, /animals/2, etc */}
            <Link href={`/animal-management-naive-dont-copy/read/${animal.id}`}>
              <a>
                {animal.firstName} is a {animal.type} with a {animal.accessory}
              </a>
            </Link>{' '}
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
export async function getServerSideProps() {
  const animals = await getAnimals();

  // Important:
  // - Always return an object from getServerSideProps
  // - Always return a key in that object that is
  // called props
  return {
    props: {
      // In the props object, you can pass back
      // whatever information you want
      animals: animals,
    },
  };
}
