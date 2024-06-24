const mongoose = require('mongoose');
const {runScraper} = require("./web_scraper");
const {runQuestionScraper} = require("./question_scraper");
const {runUserMocker} = require("./mock_users");

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_HOST);
        await runScraper(true);
        await runQuestionScraper(true);
        await runUserMocker(true);
    } catch (error) {
        console.log('Error connecting to MongoDB: ' + error);
    }
}

main().then(() => {
    console.log('Scraper is running');
}).catch((error) => {
    console.log('Scraper failed to start: ' + error);
});