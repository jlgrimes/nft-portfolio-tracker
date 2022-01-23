// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { OPENSEA_API_BASE_URL } from '../constants';
import { getAveragePortfolioValue } from '../utils/portfolio';
const url = require('url');

export default async function handler(req, res) {
  const ownerId = url.parse(req.url, true).query.id;

  if (!ownerId) {
    res.status(500).json({ error: 'Error: ID must be passed' })
  }

  const collections = await fetch(`${OPENSEA_API_BASE_URL}/collections?asset_owner=${ownerId}`).then((r) => r.json());

  // TODO: for different currencies
  const priceOfEthereumResponse = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot').then((r) => r.json());
  const priceOfEthereum = await priceOfEthereumResponse.data.amount;

  res.status(200).json({
    stats: {
      average_eth: getAveragePortfolioValue(collections),
      average_usd: getAveragePortfolioValue(collections) * priceOfEthereum
    },
    collections
  })
}
