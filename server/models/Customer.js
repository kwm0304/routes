const mongoose = require('mongoose');

const{ Schema } = mongoose;

const customerSchema = new Schema({
  practiceName: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  order: [orderSchema],
  location: locationSchema
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer;
