require('dotenv').config();
const http = require('https');
const { JSDOM } = require('jsdom');
const mongoose= require('mongoose');
const HOST = process.env.MONGO_HOST;
const {START_LINK } = require('./links');
const Question = require('../models/question_model')


const scrapeQuestion = async (data, id) => {
    let questionModel = {
        id: id,
        title: '',
        image: null,
        answers: []
    }
    const dom = new JSDOM(data);
    const doc = dom.window.document;
    const title = doc.querySelectorAll('.question-title')[0].textContent;
    const imgURL = doc.querySelector(".panel-body img")?.src;
    const answers = doc.querySelectorAll('.answer');
    const links = doc.querySelectorAll('.panel-footer a')
    const nextLink = links[1].href;

    questionModel.title = title;
    questionModel.image = imgURL;

    answers.forEach((answer,key) => {
        let correctAnswer = parseInt(answer.getAttribute('data-correct'));
        questionModel.answers.push({
            key: key,
            value: answer.textContent, 
            correct: correctAnswer
        });
    });
    let question = new Question(questionModel);
    await question.save();
    return nextLink;
}

async function scrapeUrl(toScrape, scrapeFunc) {
    return new Promise((resolve, reject) => {
        http.get(toScrape.url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', async () => {
                let link = await scrapeFunc(data, toScrape.id);
                resolve(link);
            });
        }).on('error', (error) => {
            console.log('Error: ' + error);
            reject(error);
        });
    });
}
async function runQuestionScraper(connected) {
    if(!connected) {
        await mongoose.connect(HOST);
    }
    await Question.collection.drop();
    console.log('Dropped collection');
    await Question.createCollection();
    console.log('Created collection')
    let i = 1;
    let startLink = START_LINK;
    while( i < 1000) {
        let newURL = await scrapeUrl({url: startLink, id: i}, scrapeQuestion);
        console.log("Proccesing: ", newURL);
        startLink = newURL;
        i++;
    }
    if(!connected) {
        await mongoose.connection.close();
    }
}

module.exports = {
    runQuestionScraper
}