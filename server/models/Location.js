//city, state, address, long, lat
const mongoose = require('mongoose')

const { Schema } = mongoose;

const locationSchema = new Schema({
  
  address: {
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: Number, requird: true}
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  }
})

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;