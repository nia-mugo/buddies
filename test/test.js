/* eslint-disable no-undef */
'use strict';

const {client} = require('./common');

describe('Buddies', ()=> {
  after(() => {
    client.close();
  });

  it('renders landing page', async ()=> {
    const res = await client.get('/').send();
    res.should.have.status(200);
  });
})