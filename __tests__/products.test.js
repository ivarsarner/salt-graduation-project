const request = require('supertest');
const { app, server } = require('../server.js');

afterAll((done) => {
  server.close();
  done();
});

describe('The API', () => {
  it('is up and running', (done) => {
    request(app)
      .get('/api/products')
      .then((res) => {
        expect(res.text).toEqual('"not implemented"');
        done();
      });
  });
});
