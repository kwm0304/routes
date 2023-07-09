//city, state, address, long, lat
const mongoose = require('mongoose')

const { Schema } = mongoose;

const locationSchema = new Schema({
  
  address: {type: String},
  title: {type: String},
  city: {type: String}
})

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;