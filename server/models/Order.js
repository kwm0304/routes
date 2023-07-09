const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new Schema({
  products: [productSchema],
  orderId: {type: String, required: true }
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order;