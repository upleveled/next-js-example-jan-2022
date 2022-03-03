import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {
  Animal,
  getAnimals,
  getValidSessionByToken,
} from '../../util/database';

const animalStyles = css`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
`;

type Props =
  | {
      animals: Animal[];
    }
  | {
      error: string;
    };

export default function AnimalsRestricted(props: Props) {
  if ('error' in props) {
    return (
      <Layout>
        <Head>
          <title>Animals Error</title>
          <meta name="description" content="An error about an animal " />
        </Head>
        <h1>Animals Error</h1>
        {props.error}
      </Layout>
    );
  }

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const sessionToken = context.req.cookies.sessionToken;
  const session = await getValidSessionByToken(sessionToken);

  if (!session) {
    return {
      props: {
        error: 'You are not allowed to see animals today',
      },
    };
  }

  const animals = await getAnimals();
  return {
    props: {
      animals: animals,
    },
  };
}
