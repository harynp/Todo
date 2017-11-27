var express = require('express');
var router = express.Router();
var UserController = require('../controllers/users')
const Auth = require('../helpers/auth')
/* GET users listing. */
router.get('/', Auth.isLogin, Auth.isAdmin, UserController.findAll);
router.post('/signup', UserController.addUser);
router.delete('/:id', UserController.rmvUser);
router.post('/login', UserController.login);
module.exports = router;
