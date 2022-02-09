import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { getAnimalById } from '../../util/database';

export default function SingleAnimal(props) {
  return (
    <Layout>
      <Head>
        <title>
          {props.animal.firstName} ({props.animal.type})
        </title>
        <meta
          description={`${props.animal.firstName} is a ${props.animal.type} with a ${props.animal.accessory}`}
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
    </Layout>
  );
}

// The parameter `context` gets passed from Next.js
// and includes a bunch of information about the
// request
export async function getServerSideProps(context) {
  // This is the variable that we get from the URL
  // (anything after the slash)
  const animalId = context.query.animalId;
  const animal = await getAnimalById(animalId);

  return {
    props: {
      animal: animal,
      // animalId: animalId,
    },
  };
}
