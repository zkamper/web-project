const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    questionsAnswered: [Number],
    quizScoreTotal: {
        type: Number,
        default: 0
    },
    quizScoreCount: {
        type: Number,
        default: 0
    },
    quizScores: [Number]
})

const User = mongoose.model("User", userSchema)
module.exports = User