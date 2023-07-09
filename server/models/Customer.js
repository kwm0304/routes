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
  order: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  location: {type: Schema.Types.ObjectId, ref: 'Location'}
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer;
