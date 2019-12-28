const Place = require('../models/Place');
const upload = require('../config/upload');
const helpers = require('../controllers/helpers');

let validParams = ['title', 'description', 'acceptsCreditCard', 'coverImage', 'address', 'avatarImage', 'openHour', 'closeHour'];


function findPlace(req, res, next) {
    Place.findOne({ slug: req.params.id })
        .then(place => {
            req.place = place;
            req.mainObj = place;
            next();
        })
        .catch(err => {
            next(err);
        })
}

function getAllPlaces(req, res) {
    Place.paginate({}, { page: req.query.page || 1 })
        .then(doc => {
            res.json(doc);
        }).catch(err => {
            console.log(err);
        });
}

function getOnePlace(req, res) {
    res.json(req.place);
}

function createOnePlace(req, res, next) {
    const params = helpers.paramsBuilder(validParams, req.body);
    params['_user'] = req.user.id;
    Place.create(
        params
    ).then(place => {
        req.place = place;
        next();
    }).catch(err => {
        next(err);
    });
}

function updateOnePlace(req, res) {
    const params = helpers.paramsBuilder(validParams, req.body);
    req.place = Object.assign(req.place, params);
    req.place.save().then(doc => {
        res.json(doc);
    }).catch(err => {
        console.log(err);
    });
}

function deleteOnePlace(req, res) {
    req.place.remove().then(doc => {
        res.json('Objeto Eliminado');
    }).catch(err => {
        res.json(err);
        console.log(err);
    })

}

function multerMiddleWare() {
    return upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'cover', maxCount: 1 }
    ]);
}

function saveImage(req, res) {
    if (req.place) {
        const files = ['avatar', 'cover'];
        const promises = [];

        files.forEach(imageType => {
            if (req.files && req.files[imageType]) {
                let path = req.files[imageType][0].path;
                promises.push(req.place.updateImage(path, imageType));
            }
        })
        Promise.all(promises).then(results => {
            res.json(req.place);
        }).catch(err => {
            res.json(err);
        });
    } else {
        res.status(422).json({ error: req.error || 'No se pudo guardar el lugar' })
    }
}

//shortHand propertie
module.exports =
{
    getAllPlaces, getOnePlace, createOnePlace, updateOnePlace, deleteOnePlace, findPlace,
    multerMiddleWare, saveImage
};