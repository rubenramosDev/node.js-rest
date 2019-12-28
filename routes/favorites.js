const express = require('express');
let router = express.Router();

const favoritesController = require('../controllers/FavoritesController');
const authenticateOwner = require('../middlewares/authenticateOwner');

const jsonWebToken = require('express-jwt');
const { jwtSecrets } = require('../config/secrets');

router.route('/')
    .get(jsonWebToken({ secret: jwtSecrets }), favoritesController.index)
    .post(favoritesController.create);

router.route('/:id')
    .delete(favoritesController.find, authenticateOwner, favoritesController.deleteFavorite);

module.exports = router;