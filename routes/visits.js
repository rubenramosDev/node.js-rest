const express = require('express');
let router = express.Router();

const visitsController = require('../controllers/VisitsController');
const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
    .get(visitsController.index)
    .post(visitsController.create);

router.route('/:visit_id')
    .delete(visitsController.find, authenticateOwner, visitsController.deleteVisit);

module.exports = router;