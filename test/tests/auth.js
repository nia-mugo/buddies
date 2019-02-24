'use strict';

const {client} = require('../common');

describe('Login Tests', ()=> {
  it('should return an error if email address is missing in login request', async ()=> {
    const response = await client.post('/login').send();
    response.status.should.equal(400);
    response.body.error.should.equal('email is required');
  });
  
  it('should return an error if password is missing in login request', async ()=> {
    const response = await client.post('/login').send({email: "test@em.co"});
    response.status.should.equal(400);
    response.body.error.should.equal('password is required');
  });
  
  it('should validate email address and password combination is correct', async() => {
    const response = await client.post('/login').send({
      email: "test@em.co", 
      password: "123456"
    });
    response.status.should.equal(401);
    response.body.error.should.equal('email address/ password mismatch');
  });
  
  it('should succeed on correct email/password combination', async () => {
    const response = await client.post('/login').send({
      email: "test@tester.com", 
      password: "123456"
    });
    response.status.should.equal(200);
    response.body.should.have.property('userId');
    response.body.should.have.property('email');
    response.body.email.should.equal('test@tester.com');
    response.headers.should.have.property('set-cookie');
  });
});

describe('Register Tests', ()=> {
  let registerRequest = {};
  beforeEach(()=>{
    registerRequest = {
      name: 'Unit Testing',
      email: 'test@testing.com',
      password: '123456',
      confirmPassword: '123456'
    }
  });

  it('should validate name in register request', async ()=> {
    delete registerRequest.name;
    const response = await client.post('/register').send(registerRequest);
    response.status.should.equal(400);
    response.body.error.should.equal('name is required');
  });

  it('should validate email in register request', async ()=> {
    delete registerRequest.email;
    const response = await client.post('/register').send(registerRequest);
    response.status.should.equal(400);
    response.body.error.should.equal('email is required');
  });

  it('should validate password in register request', async ()=> {
    delete registerRequest.password;
    const response = await client.post('/register').send(registerRequest);
    response.status.should.equal(400);
    response.body.error.should.equal('password is required and must be greater than 6 characters');
  });

  it('should validate confirm password matches password', async ()=> {
    delete registerRequest.confirmPassword;
    const response = await client.post('/register').send(registerRequest);
    response.status.should.equal(400);
    response.body.error.should.equal('passwords dont match');
  });

  it('should register a user if all parameters are provided', async function() {
    const response = await client.post('/register').send(registerRequest);
    response.status.should.equal(201);
    response.body.should.have.property('userId');
    response.body.should.have.property('email');
    response.body.email.should.equal('test@testing.com');
    response.headers.should.have.property('set-cookie');
  });

  it('should not allow reuse of the same email', async function() {
    registerRequest.email= "test@tester.com";
    const response = await client.post('/register').send(registerRequest);
    response.status.should.equal(400);
    response.body.error.should.equal('email address already exists');
  });
});


