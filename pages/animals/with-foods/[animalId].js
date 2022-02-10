import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import { getAnimalWithFoodsById } from '../../../util/database';
import { getReducedAnimalWithFoods } from '../../../util/dataStructures';

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
      <div>
        favorite foods:{' '}
        {props.animal.foods.map((food) => (
          <span key={`food-${food.id}`}>{food.name}&nbsp;&nbsp;&nbsp;</span>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const animalId = context.query.animalId;
  const animalFavoriteFoods = await getAnimalWithFoodsById(animalId);
  console.log(animalFavoriteFoods);

  const animal = getReducedAnimalWithFoods(animalFavoriteFoods);

  return {
    props: {
      animal: animal,
    },
  };
}
