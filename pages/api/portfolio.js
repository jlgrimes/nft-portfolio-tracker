// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const url = require('url');

export default async function handler(req, res) {
  const ownerId = url.parse(req.url, true).query.id;

  if (!ownerId) {
    res.status(500).json({ error: 'Error: ID must be passed' })
  }

  res.status(200).json({ name: 'John Doe' })
}
