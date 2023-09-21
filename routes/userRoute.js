const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { autheticateToken } = require('../middlewares/authMiddleware.js');


router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/dashboard', autheticateToken, userController.getDashboardPage);
router.get('/', autheticateToken, userController.getAllUsers);
router.get('/:id', autheticateToken, userController.getUser);
router.put('/:id/follow', autheticateToken, userController.follow);
router.put('/:id/unfollow', autheticateToken, userController.unfollow);


module.exports = {
    routes: router
}