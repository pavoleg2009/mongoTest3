const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/muber_test');
  console.log('Connected to test db: mongodb://localhost/muber_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Error conntecting to test db', error);
    });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }) )
    .then(() => done())
    .catch(() => done());
})
