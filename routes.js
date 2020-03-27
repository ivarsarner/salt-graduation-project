const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('*', (req, res) => res.status(400).end());
router.delete('*', (req, res) => res.status(400).end());
router.patch('*', (req, res) => res.status(400).end());

router.get('/', async (req, res) => {
  const { data } = await axios.get(
    'https://randomuser.me/api/?nat=gb&results=10&noinfo&exc=location,login,id,email,dob,phone,cell,registered'
  );
  const customers = data.results.map((customer) => ({
    name: `${customer.name.first} ${customer.name.last}`,
    picture: customer.picture.large,
  }));
  res.json(customers);
});

module.exports = router;
