require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI , {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true
});


module.exports = mongoose.connection;