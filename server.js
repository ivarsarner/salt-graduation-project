const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.get('/api', (req, res) => res.send('Hello World!'));

app.listen(port);

module.exports.app = app;
