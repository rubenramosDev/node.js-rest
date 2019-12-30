const express = require('express');
let router = express.Router();

const visitsController = require('../controllers/VisitsController');
const authenticateOwner = require('../middlewares/authenticateOwner');

const jsonWebToken = require('express-jwt');
const { jwtSecrets } = require('../config/secrets');

router.route('/')
    .get(jsonWebToken({ secret: jwtSecrets }), visitsController.index)
    .post(visitsController.create);

router.route('/:visit_id')
    .delete(visitsController.findVisit, authenticateOwner, visitsController.deleteVisit);

module.exports = router;