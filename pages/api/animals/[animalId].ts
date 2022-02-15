// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import {
  Animal,
  deleteAnimalById,
  getAnimalById,
  updateAnimalById,
} from '../../../util/database';

type AnimalNextApiRequest = NextApiRequest & {
  // When you are implementing, add an animal property here
  body: {
    animal: Animal;
  };
};

type AnimalResponseBody =
  | { error: string }
  | {
      message: string;
    }
  | { animal: Animal };

export default async function handler(
  request: AnimalNextApiRequest,
  response: NextApiResponse<AnimalResponseBody>,
) {
  console.log('is this the id', request.query.animalId);

  const animalId = Number(request.query.animalId);
  // check that the id passed is a number

  console.log(animalId);
  // check if animalId is not a number
  if (!animalId) {
    response.status(400).json({ error: 'animalId must be a number' });
    return;
  }

  if (request.method === 'GET') {
    const animal = await getAnimalById(animalId);

    // check if there is not animal with the id passed into the database
    console.log(animal);
    if (!animal) {
      response.status(404).json({ message: 'animal not found' });
      return;
    }

    // if the method is GET return the animal with the matched id
    response.status(200).json({ animal: animal });
    return;
  } else if (request.method === 'PUT') {
    // if the method is PUT update the animal and response the updated animal

    // access the body animal from the request object
    const animalFromRequest = request.body;

    // TODO: create error responses when the body don't have the full data. with a 400 status code

    const updatedAnimal = await updateAnimalById(
      animalId,
      animalFromRequest.firstName,
      animalFromRequest.age,
      animalFromRequest.type,
    );

    if (!updatedAnimal) {
      response.status(404).json({ message: 'animal not found' });
      return;
    }

    response.status(200).json({ animal: updatedAnimal });
    return;
  } else if (request.method === 'DELETE') {
    // if the method is DELETE delete the animal matching the id and response the deleted animal
    const deletedAnimal = await deleteAnimalById(animalId);

    if (!deletedAnimal) {
      response.status(404).json({ message: 'animal not found' });
      return;
    }

    response.status(200).json({ animal: deletedAnimal });
    return;
  }

  response.status(405).json({ error: 'Method not Allowed' });
}
