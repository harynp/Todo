var express = require('express');
var router = express.Router();
const usersFb = require('../controllers/userFbController')
const FB = require('fb')

const setAccessToken = (req, res, next) => {
  console.log('req.headers.fbaccesstoken ', req.headers.fbaccesstoken)
  FB.setAccessToken(req.headers.fbaccesstoken);
  next()
}

router.post('/', setAccessToken, usersFb.login)

module.exports = router;
