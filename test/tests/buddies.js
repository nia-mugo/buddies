'use strict';

const {authedClient} = require('../common');

describe('Create Buddy Tests', async () => {
  it('creates a buddy request', async ()=> {
    const response = await authedClient.post('/buddies').send({
      email: "test@tester.com"
    });
    response.status.should.equal(201);
    response.body.buddyEmail.should.equal('test@tester.com');
    response.body.status.should.equal('pending');
  });
  
  it('does not create duplicate requests', async ()=> {
    const response = await authedClient.post('/buddies').send({
      email: "test@buddy.com"
    });
    response.status.should.equal(400);
    response.body.error.should.equal('buddy request already exists');
  });
});

describe('Accept Buddy Tests', () => {
  it('accepted buddy requests move to buddies list', async () => {
    const response = await authedClient.get('/buddies').send();

    const buddiesLength = response.body.myBuddies.length;
    const outgoingLength = response.body.outgoingBuddyRequests.length;

    const buddyRequest = response.body.outgoingBuddyRequests[0];
    buddyRequest.buddyEmail.should.equal('test@buddy.com');
    buddyRequest.status.should.equal('pending');
    const acceptRequest = {
      id: buddyRequest.id
    };

    const acceptResponse = await authedClient.put('/buddies').send(acceptRequest);
    acceptResponse.body.outgoingBuddyRequests.length.should.equal(outgoingLength - 1);
    acceptResponse.body.myBuddies.length.should.equal(buddiesLength + 1);
  });
});




