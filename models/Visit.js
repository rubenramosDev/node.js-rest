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


visitSchema.plugin(mongoosePaginate);

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
