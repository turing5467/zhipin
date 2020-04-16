const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    phone: String,
    pwd: String
})

const userModel = mongoose.model('user', schema, 'user')

module.exports = userModel;