const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - user', () => {

  it('should fail to create a pet without a Name', async () => {
    const res = await request(app).post('/pets').send({
      age: '16',
      colour: 'brown',
    });
    console.log("[ res.status ]", res.status)
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  it('should create a user', async () => {
    const pet = {
      name: 'tommy',
      age: 3,
      colour: 'green',
    };
    const res = await request(app).post('/pets').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.result.name).to.equal(pet.name);
    expect(res.body.result.age).to.equal(pet.age);
    expect(res.body.result.colour).to.equal(pet.colour);
  });
});