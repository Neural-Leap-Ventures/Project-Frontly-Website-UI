require('dotenv').config()
const mongoose = require('mongoose')
require('./customFunctions/userModel')
const User = mongoose.model('users')
const shortid = require('shortid')

exports.handler = async (event, context) => {
  const array = event.body.split('&')
  const name = array[0].split('name=')
  const phone = array[1].split('Phone=')
  const email = array[2].split('Email=')
  const company = array[3].split('Company=')

  const a = decodeURIComponent(name[1])
  const b = decodeURIComponent(phone[1])
  const c = decodeURIComponent(email[1])
  const d = decodeURIComponent(company[1])

  try {
    mongoose.connect(process.env.MONGODB_URI_DEPLOYA, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    const shortIdVariable = shortid.generate()

    const user = await new User({
      referralId: shortIdVariable,
      name: a,
      phone: b,
      email: c,
      company: d,
    })

    await user.save()
    mongoose.disconnect()
    return {
      statusCode: 200,
      body: 'Success',
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: err,
    }
  }
}
