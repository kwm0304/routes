//has locations and belongs to driver
const mongoose = require('mongoose')

const { Schema } = mongoose;

const routeSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  customers: [{
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  }]

})

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;