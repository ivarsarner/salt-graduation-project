const express = require('express');
const axios = require('axios');

const router = express.Router();

const endpoint =
  'https://randomuser.me/api/?nat=gb&noinfo&exc=location,id,email,dob,phone,cell,registered';

const getData = async (limit) => {
  try {
    const { data } = await axios.get(`${endpoint}&results=${limit}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

router.get('/', async (_, res) => {
  try {
    const data = await getData(100);
    const customers = data.results.map((customer) => ({
      id: customer.login.uuid,
      name: `${customer.name.first} ${customer.name.last}`,
      picture: customer.picture.large,
    }));
    res.json(customers);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/one', async (_, res) => {
  try {
    const request = await getData(1);
    const data = request.results
      .map((key) => ({
        id: key.login.uuid,
        name: `${key.name.first} ${key.name.last}`,
        picture: key.picture.large,
      }))
      .slice(0, 1);
    const customer = { ...data[0] };
    res.json(customer);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
