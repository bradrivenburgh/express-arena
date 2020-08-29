const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('GET /apps', () => {
  it('should return an array of apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.a.lengthOf.at.least(1);
        const firstApp = res.body[0];
        expect(firstApp).to.include.all.keys(
          "App", "Category", "Rating", "Reviews", "Size", 
          "Installs", "Type", "Price", "Content Rating", "Genres"
        );
      });
  });

  it('should be 400 if sort is incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'MISTAKE' })
      .expect(400, 'Sort must be one of "Rating" or "App"')
  });

  it('should be 400 if genres is incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'Mistake' })
      .expect(400, 'Genres must be one of "Action", "Puzzle", "Strategy", "Casual", "Arcade", or "Card"')
  });

  it('should sort by App', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'App' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        const sort = 'App';
        let expected = res.body
          .sort((a, b) => a[sort].localeCompare(b[sort]));
        expect(expected).to.eql(res.body);
      });
  });

});

