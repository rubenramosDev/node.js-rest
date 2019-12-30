const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const REACTIONS = ['Me encanta', 'Lo adoro', 'Lo odio'];

let visitSchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    comment: String,
    reaction: {
        type: String,
        enum: REACTIONS
    }
});

//Funciones
visitSchema.statics.forUser = function (userId, paginate) {
    return Visit.paginate({ '_user': userId }, { page: paginate, limit: 5, sort: { '_id': -1 } });
}

visitSchema.plugin(mongoosePaginate);
const Visit = mongoose.model('Visit', visitSchema);
module.exports = Visit;
