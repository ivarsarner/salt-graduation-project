const request = require('supertest');
const { app, server } = require('../server.js');

afterAll((done) => {
  server.close();
  done();
});

describe('The all customers API', () => {
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
  it('returns at least 1 customer', (done) => {
    request(app)
      .get('/api/customers')
      .then((res) => {
        expect(res.body.length).toBeGreaterThanOrEqual(1);
        done();
      });
  });
  it('returns a name and a photo', (done) => {
    request(app)
      .get('/api/customers')
      .then((res) => {
        const result = res.body[0];
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('picture');
        done();
      });
  });
  it('returns a first and last name', (done) => {
    request(app)
      .get('/api/customers')
      .then((res) => {
        const result = res.body[0];
        expect(result.name).toMatch(/\b\w+\s\b\w+/);
        done();
      });
  });
  it('returns url for user image', (done) => {
    request(app)
      .get('/api/customers')
      .then((res) => {
        const result = res.body[0];
        expect(result.picture).toMatch(/(https?:\/\/.*\.(?:png|jpg))/i);
        done();
      });
  });
});

describe('The single customer API', () => {
  it('returns 200', (done) => {
    request(app)
      .get('/api/customers/one')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
  it('only works for GET requests', (done) => {
    request(app)
      .post('/api/customers/one')
      .then((res) => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });
  it('returns one customer object', (done) => {
    request(app)
      .get('/api/customers/one')
      .then((res) => {
        const result = res.body;
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('picture');
        done();
      });
  });
  it('returns only 1 customer', (done) => {
    request(app)
      .get('/api/customers/one')
      .then((res) => {
        expect(Object.keys(res.body)).toEqual(['id', 'name', 'picture']);
        done();
      });
  });
  it('returns a first and last name', (done) => {
    request(app)
      .get('/api/customers/one')
      .then((res) => {
        expect(res.body.name).toMatch(/\b\w+\s\b\w+/);
        done();
      });
  });
  it('returns url for user image', (done) => {
    request(app)
      .get('/api/customers/one')
      .then((res) => {
        expect(res.body.picture).toMatch(/(https?:\/\/.*\.(?:png|jpg))/i);
        done();
      });
  });
  // should not return a previous customer
});
