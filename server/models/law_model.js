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

const Law = mongoose.model('Law', lawSchema);

module.exports = Law;