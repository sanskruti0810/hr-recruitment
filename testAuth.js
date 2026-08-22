const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('./app');

async function runAuthTests() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri);

  try {
    console.log('Connected to in-memory MongoDB');

    const userPayload = {
      name: 'Candidate One',
      email: 'candidate1@example.com',
      password: 'Password123!',
      role: 'Candidate',
    };

    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send(userPayload)
      .set('Accept', 'application/json');

    console.log('Register status:', registerResponse.status);
    console.log('Register body:', registerResponse.body);

    if (registerResponse.status !== 201) {
      throw new Error('Register failed');
    }

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: userPayload.email, password: userPayload.password })
      .set('Accept', 'application/json');

    console.log('Login status:', loginResponse.status);
    console.log('Login body:', loginResponse.body);

    if (loginResponse.status !== 200) {
      throw new Error('Login failed');
    }

    const duplicateResponse = await request(app)
      .post('/api/auth/register')
      .send(userPayload)
      .set('Accept', 'application/json');

    console.log('Duplicate register status:', duplicateResponse.status);
    console.log('Duplicate register body:', duplicateResponse.body);

    if (duplicateResponse.status !== 409) {
      throw new Error('Duplicate email check failed');
    }

    console.log('Auth routes verified successfully');
  } catch (error) {
    console.error('Auth verification failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    await mongod.stop();
  }
}

runAuthTests();
