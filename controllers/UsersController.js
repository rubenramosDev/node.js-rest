const { paramsBuilder } = require('./helpers');
const Users = require('../models/Users');

const validParams = ['email', 'name', 'password'];

function create(req, res, next) {
    //Se manda un arreglo con los par permitidos
    let params = paramsBuilder(validParams, req.body);
    Users.create(params).then(user => {
        req.user = user;
        next();
    }).catch(err => {
        res.status(422).json(err)
        console.log(err);
    });
};

function myPlaces(req, res) {
    Users.findOne({ '_id': req.user.id })
        .then(user => {
            user.places.then(places => {
                res.json(places);
            });
        }).catch(err => {
            res.json(err);
        });
};

module.exports = { create, myPlaces }

