require('dotenv').config();
const http = require('https');
const { JSDOM } = require('jsdom');
const mongoose= require('mongoose');
const HOST = process.env.MONGO_HOST;
const { TO_SCRAPE_LAW, TO_SCRAPE_IMG } = require('./links');
const Law = require('../models/law_model')
const Image = require('../models/sign_model')
runScraper().then(() => {
    console.log('Connected to MongoDB');
})

const processLawData = async (data, name) => {
    let lawModel = {
        section: name,
        articles: []
    }
    const dom = new JSDOM(data);
    const doc = dom.window.document;
    const articles = doc.querySelectorAll('p');
    for (const article of articles) {
        lawModel.articles.push(article.textContent);
    }
    let law = new Law(lawModel);
    await law.save();
}

const processImageData = async (data, name) => {
    const dom = new JSDOM(data);
    const doc = dom.window.document;
    const cards = doc.querySelectorAll('.card-link');
    for (const card of cards) {
        let imageModel = {
            section: name,
            image: '',
            title: '',
            subtitle: ''
        }
        imageModel.image = card.querySelector('img').src;
        if(!imageModel.image.includes("storage")) {
            return;
        }
        imageModel.title = card.querySelector('.card-title').textContent;
        imageModel.subtitle = card.querySelector('p').textContent;
        let image = new Image(imageModel);
        await image.save();
    }
}

async function scrapeUrl(toScrape, scrapeFunc) {
    return new Promise((resolve, reject) => {
        http.get(toScrape.url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', async () => {
                await scrapeFunc(data, toScrape.name);
                resolve();
            });
        }).on('error', (error) => {
            console.log('Error: ' + error);
            reject(error);
        });
    });
}
async function runScraper() {
    await mongoose.connect(HOST);
    await Law.collection.drop();
    await Image.collection.drop();
    console.log('Collections dropped');
    await Law.createCollection();
    await Image.createCollection();
    console.log('Collections created');
    for (const toScrape of TO_SCRAPE_LAW) {
        await scrapeUrl(toScrape, processLawData);
    }
    for(const toScrape of TO_SCRAPE_IMG) {
        await scrapeUrl(toScrape, processImageData);
    }
    await mongoose.connection.close();
}

module.exports = {
    runScraper
}