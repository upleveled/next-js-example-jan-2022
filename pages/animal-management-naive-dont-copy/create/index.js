import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import { createAnimal } from '../../../util/database';

export default function CreateAnimal(props) {
  return (
    <Layout>
      <Head>
        <title>
          Created {props.animal.firstName} ({props.animal.type})
        </title>
        <meta
          name="description"
          content={`${props.animal.firstName} is a newly-created ${props.animal.type} with a ${props.animal.accessory}`}
        />
      </Head>
      <h1>Created animal</h1>
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
  const firstName = context.query.firstName;
  const age = context.query.age;
  const type = context.query.type;
  const accessory = context.query.accessory;
  // TODO: if we don't pass something, it should error out
  const animal = await createAnimal(firstName, age, type, accessory);

  return {
    props: {
      animal: animal,
    },
  };
}
