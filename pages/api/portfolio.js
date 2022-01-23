// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { OPENSEA_API_BASE_URL } from '../constants';
const url = require('url');

export default async function handler(req, res) {
  const ownerId = url.parse(req.url, true).query.id;

  if (!ownerId) {
    res.status(500).json({ error: 'Error: ID must be passed' })
  }

  const userCollections = await fetch(`${OPENSEA_API_BASE_URL}/collections?asset_owner=${ownerId}`).then((r) => r.json());

  res.status(200).json(userCollections)
}
