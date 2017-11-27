const mongoose = require('mongoose')

const userFbSchema = new mongoose.Schema({
  fb_id: String,
  name: String,
  email: String
}, {
  timestamps: true
})

const fbuser = mongoose.model('fbuser', userFbSchema)

module.exports = fbuser
