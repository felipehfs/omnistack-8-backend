const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    date: String,
    company: String,
    techs: [String],
    price: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot',
    },
}, {
    toJSON: {
        virtuals: true,
    }
});

SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://192.168.0.7:3333/files/${this.thumbnail}`;
})

module.exports = mongoose.model('Spot', SpotSchema);