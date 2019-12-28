const express = require('express');
let router = express.Router();

const placeController = require('../controllers/PlacesController');
const authenticareOwner = require('../middlewares/authenticateOwner');

router.route('/')
    .get(placeController.getAllPlaces)
    .post(placeController.multerMiddleWare(), placeController.createOnePlace, placeController.saveImage);
//, 
router.route('/:id')
    .get(placeController.findPlace, placeController.getOnePlace)
    .put(placeController.findPlace, authenticareOwner, placeController.updateOnePlace)
    .delete(placeController.findPlace, authenticareOwner, placeController.deleteOnePlace);

module.exports = router;    