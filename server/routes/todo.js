var express = require('express');
var router = express.Router();
var TodoController = require('../controllers/todo')
const Auth = require('../helpers/auth')
/* GET users listing. */
router.get('/id/:id', Auth.isLogin, Auth.isAdmin, TodoController.getAll);
router.post('/', Auth.isLogin, Auth.isAdmin, TodoController.addTodo);
router.put('/:id', Auth.isLogin, Auth.isAdmin, TodoController.updTodo);
router.delete('/:id',Auth.isLogin, Auth.isAdmin, TodoController.delTodo);

module.exports = router;
