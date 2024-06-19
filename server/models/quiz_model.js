const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizTokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true
        },
        username: String,
        createdAt: {
            type: Date,
            required: true
        },
        questions: [Number],
        correctAnswers: Number,
        incorrectAnswers: Number
    }
);

const QuizToken = mongoose.model('QuizToken', quizTokenSchema);
module.exports = QuizToken;