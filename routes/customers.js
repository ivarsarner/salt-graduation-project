const express = require('express');
const axios = require('axios');

const router = express.Router();

let existingUsers = [];

const endpoint =
  'https://randomuser.me/api/?nat=gb&noinfo&exc=location,id,email,dob,phone,cell,registered';

const getData = async (limit) => {
  const { data } = await axios.get(`${endpoint}&results=${limit}`);
  return data;
};

router.get('/', async (_, res) => {
  const data = await getData(10);
  const customers = data.results.map((customer) => ({
    id: customer.login.uuid,
    name: `${customer.name.first} ${customer.name.last}`,
    picture: customer.picture.large,
  }));
  res.json(customers);
});

router.get('/one', async (_, res) => {
  const request = await getData(1);
  const { uuid } = request.results[0].login;
  if (existingUsers.indexOf(uuid) >= 0) {
    res.redirect('/');
    // a duplicate was found. run a second search.
    // this is a temp ugly hack
  } else {
    const data = request.results
      .map((key) => ({
        id: key.login.uuid,
        name: `${key.name.first} ${key.name.last}`,
        picture: key.picture.large,
      }))
      .slice(0, 1);
    const customer = { ...data[0] };
    const storeUserId = [...existingUsers, uuid];
    existingUsers = storeUserId;
    res.json(customer);
  }
});

module.exports = router;
