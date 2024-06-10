const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    key: {
        type: Number,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    correct: {
        type: Number,
        required: true
    }
});

const questionSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    answers: [answerSchema],
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;