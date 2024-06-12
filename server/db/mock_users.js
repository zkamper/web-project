require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user_model');
const {faker} = require('@faker-js/faker');
const CryptoJS = require('crypto-js');
async function run() {
    await mongoose.connect(process.env.MONGO_HOST);
    for(let i = 0; i < 10; i++) {
        let count = Math.floor(Math.random() * 10);
        let quizScores = [];
        for(let j = 0; j < count; j++){
            quizScores.push(Math.ceil(Math.random() * 26));
        }
        const user = new User({
            username: faker.internet.userName().toLowerCase(),
            email: faker.internet.email().toLowerCase(),
            hashedPassword: CryptoJS.SHA256(faker.internet.password()).toString(),
            questionsAnswered: Math.floor(Math.random() * 999),
            quizScoreCount: count,
            quizScoreTotal: quizScores.reduce((a, b) => a + b, 0),
            quizScores: quizScores
        })
        await user.save();
    }
    await mongoose.connection.close();
}

run().then(() => {
    console.log('Users created');
});