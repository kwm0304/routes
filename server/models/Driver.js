// Has route and metrics like volume and avg time
const mongoose = require('mongoose')

const { Schema } = mongoose;

const driverSchema = new Schema({
  averageMileage: {
    type: Number,
    required: true
  },
  averageTime: {
    type: Number,
    required: true
  },
  route: RouteSchema
})

const Driver = mongoose.model("Driver", driverSchema)

module.exports = Driver;