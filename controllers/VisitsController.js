const Visit = require('../models/Visit');

const paramsBuilder = require('./helpers').paramsBuilder;
const params = ['_place', 'reaction', 'comment'];

const Users = require('../models/Users');

function index(req, res) {
    let promise = null;
    if (req.place) {
        promise = req.place.visits;
    } else if (req.user) {
        promise = Visit.forUser(req.user.id, req.query.page || 1);
    }

    if (promise) {
        promise.then(visits => {
            res.json(visits);
        }).catch(err => {
            res.status(500).json(err);
        })
    } else {
        res.status(400).json({});
    }
}

function find(req, res, next) {
    Visit.findById(req.params.visit_id)
        .then(visit => {
            req.mainObj = visit;
            req.favorite = visit;
            next();
        }).catch(next);
}

function create(req, res) {
    let par = paramsBuilder(params, req.body);
    par['_user'] = req.user.id;

    Visit.create(par)
        .then(visit => {
            res.json(visit);
        }).catch(err => {
            res.status(422).json(err);
        });
}

function deleteVisit(req, res, next) {
    req.favorite.remove().then(resp => {
        res.json('Success');
    }).catch(err => {
        res.status(500).json(err);
    });
}

module.exports = {
    find, create, deleteVisit, index
}