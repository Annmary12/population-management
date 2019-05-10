import chai from 'chai';
import supertest from 'supertest';
import server from '../bin/www';


const { expect } = chai;
const request = supertest(server);
const BASE_URL = '/api/v1';

describe('App Route Test', () => {
  it('should return an error when the route does not exit', (done) => {
    request.get(`${BASE_URL}/route`)
    .end((err, res) => {
      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('Route doesn\'t exist');
      done();
    })
  })

  it('should render the welcome route', (done) => {
    request.get('/')
    .end((err, res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Welcome to population management system API!!!');
      done();
    })
  })
})