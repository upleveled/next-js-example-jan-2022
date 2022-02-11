// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createAnimal, getAnimals } from '../../../util/database';

export default async function handler(request, response) {
  console.log('request Method', request.method);
  console.log('request Body', request.body);

  // access the method from the request object
  if (request.method === 'GET') {
    // if the method is get response with an array of animals

    const animals = await getAnimals();

    response.status(200).json(animals);
    return;
  }

  if (request.method === 'POST') {
    // if the post create a new animal and response the new created animal

    // access the body animal from the request object
    const animalFromRequest = request.body;

    // TODO: create error responses when the body don't have the full data. with a 400 status code

    const newAnimal = await createAnimal(
      animalFromRequest.firstName,
      animalFromRequest.age,
      animalFromRequest.type,
      animalFromRequest.accessory,
    );

    response.status(200).json(newAnimal);
    return;
  }

  response.status(405).json({ error: 'Method not Allowed' });

  // if any other method response method not allowed
}
