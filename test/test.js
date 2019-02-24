/* eslint-disable no-undef */
'use strict';

const {client, authedClient, clearTestBuddies, clearTestUsers} = require('./common');

describe('Buddies', ()=> {
  before(async ()=> {
    const registrationData = {
      name: "Unit Tester",
      email: "test@tester.com",
      password: "123456",
      confirmPassword: "123456",
    };
    await authedClient.post('/register').send(registrationData);
  });

  beforeEach(async ()=> {
    const buddyRequestData = {
      email: "test@buddy.com"
    };
    await authedClient.post('/buddies').send(buddyRequestData);
  });

  afterEach(async () => {
    await clearTestBuddies();
  });

  after(async () => {
    await clearTestUsers();
    client.close();
  });

  describe("Test Authentication", function() {
    require('./tests/auth.js');
  });

  describe("Test Buddies", function() {
    require('./tests/buddies.js');
  });
})