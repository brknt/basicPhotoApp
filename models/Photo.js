const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PhotoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    url: {
        type: String,
        required: true
    }

});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;