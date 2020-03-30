const request = require('supertest');
const { app, server } = require('../server.js');

afterAll((done) => {
  server.close();
  done();
});

describe('The API', () => {
  it('is up and running', (done) => {
    request(app)
      .get('/api')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
  it('returns the welcome message', (done) => {
    request(app)
      .get('/api')
      .then((res) => {
        expect(res.text).toBe('Way Merchant API');
        done();
      });
  });
});
