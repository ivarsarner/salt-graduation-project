const express = require('express');
const axios = require('axios');
const util = require('util');
const fs = require('fs');

const router = express.Router();
const asyncReadFile = util.promisify(fs.readFile);
const imageEndpoint = 'https://assets.icanet.se/t_product_large_v1,f_auto';

const rareImages = [
  '40099330',
  '856991004905',
  '2319291709430',
  '2340302105897',
  '5024278003063',
];

const getApiImage = async (res, gtin) => {
  try {
    const response = await axios.get(`${imageEndpoint}/${gtin}.jpg`);
    if (response.status === 200) {
      res.json({
        path: response.config.url,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getLocalImage = async (res, gtin) => {
  const loadImage = await asyncReadFile(`./db/images/${gtin}.jpg`);
  if (loadImage) {
    res.json({
      path: `/api/images/${gtin}.jpg`,
    });
  }
};

router.get('/:gtin', async (req, res) => {
  try {
    const { gtin } = req.params;
    if (rareImages.indexOf(gtin) !== -1) {
      // return local image
      await getLocalImage(res, gtin);
    } else {
      // return image from ICA api
      await getApiImage(res, req.params.gtin);
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
