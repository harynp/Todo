const Model = require('../models/todo')
const jwt = require('jsonwebtoken')
var ObjectId  = ('mongodb').ObjectId


class Todo {
  static getAll (req,res) {
    Model.find({
      userId: req.headers.auth._id || req.headers.id
    })
    .populate({path:'userid', select: 'username'})
    .then(content => res.send(content))
    .catch(err => console.error(err))
  }

  static addTodo (req,res) {
    console.log('INI REQ BODY',req.body);
    Model.create({
      content : req.body.content,
      userId  : req.headers.id
    })
    .then(data => res.send(data))
    .catch(err => console.error(err))
  }
  static delTodo (req,res) {
    Model.findByIdAndRemove(req.params.id)
    .then(delTodo => res.send(delTodo))
    .catch(err => console.error(err))
  }

  static updTodo (req,res) {
    Model.findByIdAndUpdate(req.params.id, {$set: {
      content : req.body.content,
      status  : req.body.status
    }})
   .then(updData => res.send(updData))
   .catch(err => console.error(err))
  }
}

module.exports = Todo
