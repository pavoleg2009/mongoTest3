const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DriverSchema = Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  }

});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
