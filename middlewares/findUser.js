const User = require('../models/Users');

module.exports = function (req, res, next) {
    if (req.user) {

        User.findById(req.user.id).then(user => {
            req.fullUser = user; 
            next();
        })
    } else {
        next();
    }
}