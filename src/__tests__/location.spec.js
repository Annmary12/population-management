import chai from 'chai';
import supertest from 'supertest';
import server from '../bin/www';
import mongoose from 'mongoose';

const { expect } = chai;
const request = supertest(server);
const BASE_URL = '/api/v1';
const location = {
  name: 'Abuja',
  totalMale: 10,
  totalFemale: 40
};
let newCreactedLocation;

describe('controller: Location', () => {
  describe('create() function', () => {
    it('should create location', (done) => {
      request.post(`${BASE_URL}/location/`)
      .send(location)
      .end((err, res) => {
        newCreactedLocation = res.body;
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Successfully Created');
        done();
      })
    });

    it('should not create location if the location exist', (done) => {
      request.post(`${BASE_URL}/location/`)
      .send(location)
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
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0]).to.equal('location name is required');
        expect(res.body.errors[1]).to.equal('total male is required');
        expect(res.body.errors[2]).to.equal('total male must be an integer');
        done();
      })
    })
  });

  describe('get() function', () => {
    let newCreactedLocation2;

    before((done) => {
      request.post(`${BASE_URL}/location/`)
      .send({
        ...location,
        name: 'Matima',
        parentLocationId: newCreactedLocation.data._id
      })
      .end((err, res) => {
        newCreactedLocation2 = res.body.data;
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Successfully Created');
        done();
      })
   });

    it('should get one location', (done) => {
      request.get(`${BASE_URL}/location/${newCreactedLocation2._id}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.location.totalMale).to.equal(newCreactedLocation2.totalMale);
        expect(res.body.location.totalPopulation).to.equal(newCreactedLocation2.totalPopulation);
        done();
      })
    })

    it('should return an error message when location is not found', (done) => {
      request.get(`${BASE_URL}/location/244378193`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body.message).to.equal('Location not found!');
        done();
      })
    })

  });

  describe('getAll() function', () => {
    it('should get all locations', (done) => {
      request.get(`${BASE_URL}/location/`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('List of all locations');
        done();
      })
    })
  })

  describe('update() function', () => {
    it('should update a locations', (done) => {
      request.put(`${BASE_URL}/location/${newCreactedLocation.data._id}`)
      .send({
        ...location,
        name: 'Utako',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Location updated succeffully');
        expect(res.body.updatedLocation.name).to.equal('utako');
        done();
      })
    })

    it('should return error for invaled location', (done) => {
      request.put(`${BASE_URL}/location/2839200782`)
      .send({
        ...location,
        name: 'Utako',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0]).to.equal('Location ID is not a valid MongoID');
        done();
      })
    })
  })

  describe('delete() function', () => {
    it('should return an error if the location does not exist', (done) => {
      request.delete(`${BASE_URL}/location/2839200782`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body.message).to.equal('Location not found!');
        done();
      })
    })

    it('should delete a location', (done) => {
      request.delete(`${BASE_URL}/location/${newCreactedLocation.data._id}`)
      .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Location deleted succeffully');
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