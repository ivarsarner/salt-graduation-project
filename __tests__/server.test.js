const request = require('supertest');
const api = require('../server.js');

const { app } = api;

describe('The API', () => {
  it('is up and running', (done) => {
    request(app)
      .get('/api')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
  it('rejects non-GET requests', (done) => {
    request(app)
      .post('/api')
      .then((res) => {
        expect(res.statusCode).toBe(404);
        done();
      });
  });
  it('returns the "hello world" message', (done) => {
    request(app)
      .get('/api')
      .then((res) => {
        expect(res.text).toBe('Hello World!');
        done();
      });
  });
});
