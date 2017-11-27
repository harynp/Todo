const db = require('../models/UserFb')
const jwt = require('jsonwebtoken')
const FB = require('fb')
require('dotenv').config()

const login = (req, res) => {
  FB.api('/me', {fields: ['id','name','email']}, (response) => {
    console.log('ini response fb', response);
    db.find({fb_id: response.id})
    .then(result => {
      if(result.length === 0){
        db.create({
          fb_id: response.id,
          email: response.email,
          name: response.name
        })
        .then(rows =>{
          var siapBungkus = {
            id: rows._id,
            fb_id: rows.fb_id,
            email: rows.email,
            name: rows.name
          }
          var token = jwt.sign(siapBungkus, process.env.JWT_SECRET)
          res.send({token: token, name: rows.name, id: rows._id})
        })
        .catch(err =>{
          res.send(err)
        })
      } else {
        console.log('udah ada user ', result)
        var siapBungkus = {
          id: result[0]._id,
          fb_id: result[0].fb_id,
          name: result[0].name
        }
        console.log('siap bungkus ', siapBungkus)
        console.log('secret nya nih ', process.env.JWT_SECRET)
        var token = jwt.sign(siapBungkus, process.env.JWT_SECRET)
        console.log('token ', token)
        res.send({token: token, name: result[0].name, id: result[0]._id})
      }
    })
  })
}

module.exports = {
  login
}
