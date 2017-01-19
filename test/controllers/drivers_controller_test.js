const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('POST to /api/drivers creates new driver', (done) => {

    Driver.count().then ( count => {

      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {

          Driver.count().then( newCount => {
            assert(count + 1 === newCount);
            done();
          });

        });
    });
  });

  it(' PUT to /api/drivers/:id updates existing driver', done => {

    const testDriver = new Driver({ email: 'test@test.com', driving: false});

    testDriver.save().then(() => {
      request(app)
        // .put('/api/drivers/' + testDrives._id, ) ES5
        .put(`/api/drivers/${testDriver._id}`) // ES6
        .send({ driving: true })
        .end(() => {

          Driver.findOne({email: 'test@test.com'})
            .then((driver) => {
              assert(driver.driving === true);
              done();
            });
        })
      })
  });

  it(' DELETE to /api/drivers/:id deletes existing driver', done => {

    const testDriver = new Driver({ email: 'del@test.com', driving: false });

    testDriver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${testDriver._id}`) // ES6
        .end(() => {

          Driver.findOne({ email: 'del@test.com' })
            .then((driver) => {
              assert(driver === null);
              done();
            });
        });
      });
  });

  it('GET to api/drivers finds drivers in a location', done => {
    const seattleDriver = new Driver({
      email: 'seattlete@test.com',
      geometry: { type: 'Point', coordinates: [-122.475, 47.614] }
    })

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
    })

    Promise.all([ seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-122.0&lat=47.0')
          .end((err, response) => {
            assert(response.body.length === 1);
            assert(response.body[0].obj.email === 'seattlete@test.com')
            done();
          })
      })

  })

});
