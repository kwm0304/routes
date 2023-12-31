const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new Schema({
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  orderId: {type: String, required: true }
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order;