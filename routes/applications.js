const express = require('express');
let router = express.Router();

const applicationController = require('../controllers/ApplicationController');

const authenticateAdmin = require('../middlewares/authenticateAdmin');
const findUser = require('../middlewares/findUser');

const jsonWebToken = require('express-jwt');
const { jwtSecrets } = require('../config/secrets');

//Se agrega este middleware a todas las rutas que utilicen este router
router.all('*', jsonWebToken({ secret: jwtSecrets }), findUser, authenticateAdmin);

router.route('/')
    .get(applicationController.index)
    .post(applicationController.create);

router.route('/:id')
    .delete(applicationController.findApplication, applicationController.deleteApplication);

module.exports = router;