const express = require('express');
let router = express.Router();

const visitsController = require('../controllers/VisitsController');
const authenticateOwner = require('../middlewares/authenticateOwner');
const placesController = require('../controllers/PlacesController');

router.route('/:id/visits')
    .get(placesController.find, visitsController.index)
    .post(placesController.find,visitsController.create);

router.route('/:id/visits/:visit_id') //Slug/visitis/idDeVisit
    .delete(visitsController.find, authenticateOwner, visitsController.deleteVisit);

module.exports = router;