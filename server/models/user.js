var mongoose = require('mongoose')
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var bcrypt = require('bcrypt')

var userSchema = new Schema({
    username  : {type: String, required: true, unique: true},
    password  : String,
    role      : {type: String, default: 'User'},
    date      : {type: Date, default: Date.now }
});

userSchema.pre("save", function(next){
  var salt = bcrypt.genSaltSync(5);
  var hash = bcrypt.hashSync(this.password, salt);
  this.password = hash
  next()
})

var User = mongoose.model('User', userSchema);

module.exports = User
