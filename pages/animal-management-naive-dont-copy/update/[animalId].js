import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import { updateAnimalById } from '../../../util/database';

export default function UpdateAnimal(props) {
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
          Updating {props.animal.firstName} ({props.animal.type})...
        </title>
        <meta
          name="description"
          content={`${props.animal.firstName} is a ${props.animal.type} with a ${props.animal.accessory}`}
        />
      </Head>
      <h1>Updating animal...</h1>
      <Image
        src={`/unfortunately-foxes/${props.animal.id}.jpeg`}
        width="300"
        height="300"
      />
      <div>id: {props.animal.id}</div>

      <h2>New Data:</h2>

      <div>name: {props.animal.firstName}</div>
      <div>age: {props.animal.age}</div>
      <div>type: {props.animal.type}</div>
      <div>accessory: {props.animal.accessory}</div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const animalId = context.query.animalId;
  const firstName = context.query.firstName;
  const age = context.query.age;
  const type = context.query.type;
  // TODO: if we don't pass something, it should error out
  const animal = await updateAnimalById(animalId, firstName, age, type);

  return {
    props: {
      animal: animal || null,
    },
  };
}
