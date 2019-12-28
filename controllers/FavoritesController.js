const FavoritePlace = require('../models/FavoritePlace');

const paramsBuilder = require('./helpers').paramsBuilder;
const params = ['_place'];

const Users = require('../models/Users');

function index(req, res) {
    Users.findOne({ '_id': req.user.id })
        .then(user => {
            user.favorites.then(places => {
                res.json(places);
            });
        }).catch(err => {
            res.json(err);
        });
}

function find(req, res, next) {
    FavoritePlace.findById(req.params.id)
        .then(fav => {
            req.mainObj = fav;
            req.favorite = fav;
            next();
        }).catch(next);
}

function create(req, res) {
    let par = paramsBuilder(params, req.body);
    par['_user'] = req.user.id;

    FavoritePlace.create(par)
        .then(fav => {
            res.json(fav);
        }).catch(err => {
            res.status(422).json(err);
        });
}

function deleteFavorite(req, res, next) {
    req.favorite.remove().then(resp => {
        res.json('Success');
    }).catch(err => {
        res.status(500).json(err);
    });
}

module.exports = {
    find, create, deleteFavorite, index
}