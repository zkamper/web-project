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
        let quizScoreTotal = 0;
        for(let j = 0; j < count; j++){
            let score = Math.ceil(Math.random() * 26);
            quizScores.push({score: score});
            quizScoreTotal += score;
        }
        let countAnswered = Math.floor(Math.random() * 500);
        // generate a random array with numbers between 1 and 999
        let questionsAnswered = [];
        for(let j = 0; j < countAnswered; j++){
            questionsAnswered.push(Math.ceil(Math.random() * 999));
        }
        questionsAnswered = [...new Set(questionsAnswered)];
        const user = new User({
            username: faker.internet.userName().toLowerCase(),
            email: faker.internet.email().toLowerCase(),
            hashedPassword: CryptoJS.SHA256(faker.internet.password()).toString(),
            questionsAnswered: questionsAnswered,
            quizScoreCount: count,
            quizScoreTotal: quizScoreTotal,
            quizScores: quizScores
        })
        await user.save();
    }
    await mongoose.connection.close();
}

run().then(() => {
    console.log('Users created');
});