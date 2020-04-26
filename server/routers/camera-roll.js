const express = require('express');
const axios = require('axios');

const { INSTAGRAM_ACCESS_TOKEN } = process.env;

const router = express.Router();

const ENDPOINT = `https://graph.instagram.com/me/media?fields=media_url&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(ENDPOINT);
    const urls = response.data.data.map((item) => item.media_url);
    res.send({ data: urls });
  } catch (err) {
    console.error(err);
    res.status(400).send({
      error: 'Unable to fetch camera roll',
      message: err.message,
    });
  }
});

module.exports = { router };
