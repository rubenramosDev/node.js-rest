const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');
const Place = require('../models/Place');
const FavoritePlace = require('../models/FavoritePlace');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        unique: true,
        required: true //DA ERROR CUANDO PONGO TRUE
    }
});

userSchema.post('save', function (user, next) {
    User.count({})
        .then(count => {
            if (count == 1) {
                User.update({ '_id': user._id }, { admin: true })
                    .then(result => {
                        next();
                    });
            } else {
                next();
            }
        })
});

//Variable virtual
userSchema.virtual('places').get(function () {
    return Place.find({ '_user': this._id });
});

userSchema.virtual('favorites').get(function () {
    return FavoritePlace.find({ '_user': this._id }, { '_place': true }) //<--Aqui solo se obtinen los lugares
        .then(favs => {
            let placesId = favs.map(fav => fav._place);
            return Place.find({ '_id': { $in: placesId } })
        })
});


userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);
module.exports = User;

