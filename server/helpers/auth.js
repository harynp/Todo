var jwt = require('jsonwebtoken');
require('dotenv').config()

const isLogin = (req,res,next) => {
    jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log('GAGAL LOGIN',err);
          res.send(err)
        } else {
            req.headers = decoded
            next()
        }
    })
}

const isAdmin = (req, res, next) => {
  if (req.headers._id == req._id || req.headers.id == req._id)  {
      next()
    }
    else {
      res.send("you cant access this data!")
  }
}

module.exports = {
  isLogin,
  isAdmin
}
