const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Uploader = require('./Uploader');
const slugy = require('../plugins/slugify');

const placeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    address: String,
    description: String,
    acceptsCreditCard: {
        type: Boolean,
        default: false
    },
    coverImage: String,
    avatarImage: String,
    openHour: Number,
    closeHour: Number,
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

//HOOKS
placeSchema.pre('save', function (next) {
    if (this.slug) return next();
    generateSlugAndContinue.call(this, 0, next);
});

//METHODS
placeSchema.methods.updateImage = function (path, imageType) {
    return Uploader(path)
        .then(secure_url => this.saveImageUrl(secure_url, imageType));
};

placeSchema.methods.saveImageUrl = function (secureUrl, imageType) {
    this[imageType + 'Image'] = secureUrl;
    return this.save();
};

placeSchema.statics.validateSlugCount = function (slug) {
    return Place.count({ slug: slug }).then(count => {
        if (count > 0) return false;

        return true;
    })
};

function generateSlugAndContinue(count, next) {
    this.slug = slugy(this.title);
    if (count != 0)
        this.slug = this.slug + '-' + count;

    Place.validateSlugCount(this.slug)
        .then(isValid => {
            if (!isValid)
                return generateSlugAndContinue.call(this, count + 1, next);

            next();
        })
};


placeSchema.plugin(mongoosePaginate);
let Place = mongoose.model('Place', placeSchema);
module.exports = Place;