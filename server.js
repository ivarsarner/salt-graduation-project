const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.get('/api', (req, res) => res.send('Hello World!'));

const server = app.listen(port);

module.exports = { server, app };
