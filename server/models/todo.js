var mongoose = require('mongoose')
var Schema = mongoose.Schema,
             ObjectId = Schema.ObjectId;

const todoSchema = new Schema({
  content : {type:String, required:true},
  userId  : {type: Schema.Types.ObjectId,ref: 'User'},
  status  : {type: Boolean, default: false}
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
