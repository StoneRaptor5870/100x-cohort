const {app, server} = require("../01-requestcount.js");

const request = require('supertest');
const assert = require('assert');
describe('GET /user', function() {
  it('One request responds with 1', function(done) {
    request(app)
      .get('/requestCount')
      .then(response => {
        expect(response.body.requestCount).toBe(1);
        done();
      })
  });

  it('10 more requests log 12', function(done) {
    let promises = [];
    for (let i = 0; i < 10; i++) {
        promises.push(request(app).get('/user'));
    }

    Promise.all(promises)
        .then(() => {
            request(app)
                .get('/requestCount')
                .then(response => {
                    expect(response.body.requestCount).toBe(12);
                    done();
                })
                .catch(err => done(err)); // Handle potential errors for the requestCount fetch
        })
        .catch(err => done(err)); // Handle potential errors in the initial requests
});

afterAll(done => {
  server.close(done); // Ensure server closes after tests
});
});

