const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lawSchema = new Schema(
    {
        section: {
            type: String,
            required: true
        },
        articles: [String]
    }
);
const imageSchema = new Schema(
    {
        section: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        subtitle: String
    }
);
const Law = mongoose.model('Law', lawSchema);
const Image = mongoose.model('Image', imageSchema);

module.exports = {
    Law,
    Image
}