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

describe('The customer API', () => {
  it('returns 200', (done) => {
    request(app)
      .get('/api/customers')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
  it('only works for GET requests', (done) => {
    request(app)
      .post('/api/customers')
      .then((res) => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });
  it('returns an array of customers', (done) => {
    request(app)
      .get('/api/customers')
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        done();
      });
  });
});
