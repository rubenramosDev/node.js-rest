const Application = require('../models/Application');

const paramsBuilder = require('./helpers').paramsBuilder;
const params = ['origins', 'name'];

function index(req, res) {
  
}

function findApplication(req, res, next) {
    Application.findById(req.params.id)
        .then(application => {
            req.mainObj = application;
            req.application = application;
            next();
        }).catch(next);
}

function create(req, res) {
    let par = paramsBuilder(params, req.body);

    Application.create(par)
        .then(application => {
            res.json(application);
        }).catch(err => {
            res.status(422).json(err);
        });
}

function deleteApplication(req, res, next) {
    req.application.remove().then(resp => {
        res.json('Success');
    }).catch(err => {
        res.status(500).json(err);
    });
}

module.exports = {
    findApplication, create, deleteApplication, index
}