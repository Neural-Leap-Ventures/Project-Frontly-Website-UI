const mongoose = require('mongoose')
const { Schema } = mongoose

const usersSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  company: String,
})

mongoose.model('users', usersSchema)
