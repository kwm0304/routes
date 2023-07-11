const Customer = require('../models/Customer')
const mongoose = require('mongoose')

const getCustomers = async (req, res) => {
  const customers = await Customer.find
}