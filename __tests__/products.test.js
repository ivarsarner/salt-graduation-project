const request = require('supertest');
const { app, server } = require('../server.js');
const appProductIds = require('./testarray');

afterAll((done) => {
  server.close();
  done();
});

describe('The API', () => {
  it('is up and running', (done) => {
    request(app)
      .get('/api/products/8717163691618')
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it('returns 404 for a non existing image', (done) => {
    request(app)
      .get('/api/products/fake')
      .then((res) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
  });
  it('returns an object with an image path', (done) => {
    request(app)
      .get('/api/products/8717163691618')
      .then((res) => {
        expect(res.body).toHaveProperty('path');
        expect(res.body.path).toMatch(/((?:png|jpg))/i);
        done();
      });
  });
  appProductIds.forEach((gtin) => {
    it('has an image', (done) => {
      request(app)
        .get(`/api/products/${gtin}`)
        .then((res) => {
          expect(res.statusCode).toEqual(200);
          done();
        })
        .catch(() => console.log('missing gtin', gtin));
    });
  });
});
