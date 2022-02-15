import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import { deleteAnimalById } from '../../../util/database';

export default function DeleteAnimal(props) {
  if (props.animal === null) {
    // TODO: You would probably want to also send
    // a 404 HTTP status code (not found)
    return (
      <Layout>
        <Head>
          <title>Animal not found</title>
          <meta name="description" content="Animal not found" />
        </Head>
        <h1>Animal not found</h1>
        Better luck next time
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>
          Deleting {props.animal.firstName} ({props.animal.type})...
        </title>
        <meta
          name="description"
          content={`${props.animal.firstName} was a ${props.animal.type} with a ${props.animal.accessory}`}
        />
      </Head>
      <h1>
        Deleting {props.animal.firstName} ({props.animal.type})...
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
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const animalId = context.query.animalId;
  const animal = await deleteAnimalById(animalId);

  return {
    props: {
      animal: animal || null,
    },
  };
}
