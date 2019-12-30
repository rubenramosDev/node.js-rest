const Application = require('../models/Application');

module.exports = function (req, res, next) {
    if (req.xhr) return next(); //Evitando peticiones AJAX

    const secret = req.headers.secret;

    if (!secret) return next();

    //Short hand propiete
    Application.findOne({ secret }).then(app => {
        if (!app) return next(new Error('Invalid App'));
        req.application = app;
        next();
    }).catch(err => {
        next(err);
    });
}