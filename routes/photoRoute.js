const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');


router.post('/', photoController.createPhoto);
router.get('/', photoController.getAllPhotos);
router.get('/:id', photoController.getPhoto);


module.exports = {
    routes: router
}