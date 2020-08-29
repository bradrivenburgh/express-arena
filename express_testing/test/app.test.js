const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express App', () => {
  it('should return a message from GET', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello Express!');
  });
});

describe('GET /quotient', () => {
  it('8 / 4 should be 2', () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 8, b: 4 })
      .expect(200, '8 divided by 4 is 2');
  });

  it('should return 400 if \'a\' is missing', () => {
    return supertest(app)
      .get('/quotient')
      .query({ b: 4 })
      .expect(400, 'Value for a is needed');
  });

  it('should return 400 if \'b\' is missing', () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 4 })
      .expect(400, 'Value for b is needed');
  });

  it('should return 400 if value of \'a\' is non-numeric', () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 'a', b: 4 })
      .expect(400, 'Value for a must be numeric');
  });

  it('should return 400 if value of \'b\' is non-numeric', () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 4, b: 'b' })
      .expect(400, 'Value for b must be numeric');
  });

  it('should return 400 if the value of b is zero', () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 4, b: 0 })
      .expect(400, 'Cannot divide by 0');
  });
});

describe('GET /generate', () => {
  it('should generate an array of 5', () => {
    return supertest(app)
      .get('/generate')
      .query({ n: 5 })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body).to.include.members([1, 2, 3, 4, 5]);
        expect(res.body).to.have.members([1, 2, 3, 4, 5]); // stricter check
      });
  });
});



describe('GET /frequency', () => {
  it('should return an error when a string is not queried', () => {
    return supertest(app)
      .get('/frequency')
      .expect(400, 'Invalid request');
  });

  it('should return a record with the appropriate keys', () => {
    return supertest(app)
      .get('/frequency')
      .query({ str: 'Precipitous' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys('unique', 'average', 'highest');
      });
  });

  it('should equal the expected return value ', () => {
    const expected = {
      "p": 2,
      "r": 1,
      "e": 1,
      "c": 1,
      "i": 2,
      "t": 1,
      "o": 1,
      "u": 1,
      "s": 1,
      "unique": 9,
      "average": 1.2222222222222223,
      "highest": "p"
    }
    
    return supertest(app)
    .get('/frequency')
    .query({ str: 'Precipitous' })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.have.all.keys(
        'p', 'r', 'e', 'c', 
        'i', 't', 'o', 'u', 's', 
        'unique', 'average', 'highest');
      expect(res.body).to.deep.equal(expected);
    });

  });

});