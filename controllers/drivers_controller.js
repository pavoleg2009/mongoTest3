const Driver = require('../models/driver');

module.exports = {

  // ES5:
  // greeting: function(req, res) { ... }
  // ES6
  greeting(req, res) {
    res.send({hi: 'there'});
  },

  index(req, res, next) {

    const {lng, lat} = req.query;

    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 } // 200 000 m 200 km
    )
      .then(driver => res.send(driver))
      .catch(next);
  },

  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);

  },

  update(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);

  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({ _id: driverId })
      .then((driver) => res.status(204).send(driver))
      .catch(next);
  }

};
