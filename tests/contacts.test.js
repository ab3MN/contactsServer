const request = require('supertest');

const router = require('../routes/api/contacts');

global.it('should return user.json', function (done) {
  request(router).get('/').expect('Hello Test').end(done);
});
