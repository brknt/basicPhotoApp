const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { autheticateToken } = require('../middlewares/authMiddleware.js');


router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/dashboard', autheticateToken, userController.getDashboardPage);
router.get('/', autheticateToken, userController.getAllUsers);
router.get('/:id', autheticateToken, userController.getUser);


module.exports = {
    routes: router
}