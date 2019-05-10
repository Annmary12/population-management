import chai from 'chai';
import supertest from 'supertest';
import server from '../bin/www';
import mongoose from 'mongoose';

const { expect } = chai;
const request = supertest(server);
const BASE_URL = '/api/v1';
const newLocation = {
  name: 'Abujaa',
  totalMale: 10,
  totalFemale: 40
}

describe('controller: Location', () => {
  describe('create() function', () => {
    it('should create location', (done) => {
      request.post(`${BASE_URL}/location/`)
      .send(newLocation)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Successfully Created');
        done();
      })
    });

    it('should not create location if the location exist', (done) => {
      request.post(`${BASE_URL}/location/`)
      .send(newLocation)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.error).to.equal('location is already existing');
        done();
      })
    });

    it('should not create location if  name, totalMale and totalFemale is not provided', (done) => {
      request.post(`${BASE_URL}/location/`)
      .send()
      .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0]).to.equal('location name is required');
        expect(res.body.errors[1]).to.equal('total male is required');
        expect(res.body.errors[2]).to.equal('total male must be an integer');
        done();
      })
    })
  })

  after((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(done);
    })
  })
})