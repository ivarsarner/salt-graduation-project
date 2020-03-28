const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

const { customersRoutes, productsRoutes } = require('./routes');

app.use('/api/images', express.static('db/images'));

app.post('*', (_, res) => res.status(400).end());
app.delete('*', (_, res) => res.status(400).end());
app.patch('*', (_, res) => res.status(400).end());

app.get('/api', (req, res) => res.send('Way Merchant API'));

app.use('/api/customers', customersRoutes);
app.use('/api/products', productsRoutes);

const server = app.listen(port);

module.exports = { server, app };
