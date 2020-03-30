const express = require('express');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 8080;

const { customersRoutes, productsRoutes } = require('./routes');

app.use(compression());

app.use('/api/images', express.static('db/images'));

app.post('*', (_, res) => res.sendStatus(400));
app.delete('*', (_, res) => res.sendStatus(400));
app.patch('*', (_, res) => res.sendStatus(400));

app.get('/api', (_, res) => res.send('Way Merchant API'));

app.use('/api/customers', customersRoutes);
app.use('/api/products', productsRoutes);

const server = app.listen(port);

module.exports = { server, app };
