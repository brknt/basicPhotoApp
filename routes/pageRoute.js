const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');


router.get('/', pageController.getIndexPage);
router.get('/about', pageController.getAboutPage);
router.get('/contact', pageController.getContactPage);
router.get('/register', pageController.getRegisterPage);
router.get('/login', pageController.getLoginPage);
router.get('/logout', pageController.getLogout);


module.exports = {
    routes: router
}