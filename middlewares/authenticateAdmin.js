module.exports = function (req, res, next) { console.log('ero')
    if (req.fullUser && req.fullUser.admin) return next();

    next(new Error('U are not allowed.'));

}

