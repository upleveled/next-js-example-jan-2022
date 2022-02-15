// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

type IndexResponseBody = {
  animals: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IndexResponseBody>,
) {
  res.status(200).json({
    animals: 'http://localhost:3000/api/animals/',
  });
}
