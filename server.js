const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

const customersRoutes = require('./routes');

app.get('/api', (req, res) => res.send('Way Merchant API'));

app.use('/api/customers', customersRoutes);

const server = app.listen(port);

module.exports = { server, app };
