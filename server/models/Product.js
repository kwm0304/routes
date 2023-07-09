const mongoose = require('mongoose');

const{ Schema } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  productQuantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;
