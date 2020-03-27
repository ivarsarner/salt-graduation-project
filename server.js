const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 8080;

app.get('/api', (req, res) => res.send('Hello World!'));

app.get('/api/users', async (req, res) => {
  const { data } = await axios.get(
    'https://randomuser.me/api/?nat=gb&results=10&noinfo&exc=location,login,id,email,dob,phone,cell,registered'
  );
  const users = data.results.map((user) => ({
    name: user.name.first + user.name.last,
    picture: user.picture.large,
  }));
  res.json(users);
});

const server = app.listen(port);

module.exports = { server, app };
