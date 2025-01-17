require('dotenv').config();
const mongoose = require('mongoose');

const {getLawsBySection} = require('./controllers/law_controller');
const {getImageBySection} = require('./controllers/image_controller');
const {addNewQuestion, deleteQuestionById, getRandomQuestion, getQuestionById, checkQuestionAnswers, handleQuiz, checkQuizQuestionAnswers,
    searchQuestions
} = require('./controllers/question_controller');
const {handleLogin, handleRegister, handleChangePassword, deleteUserProgress, getTopUsers, handleUserProfile,
    getAdminDashboard, getUsersCSV
} = require("./controllers/user_controller");
const handleResponse = require("./utils/handleResponse");
const loadRss = require('./controllers/rss_controller');
const User = require('./models/user_model');
const QuizToken = require('./models/quiz_model');
const Question = require('./models/question_model')

// Server setup
const http = require('http');
const url = require('url');
const {runScraper} = require("./db/web_scraper");
const {runUserMocker} = require("./db/mock_users");
const {runQuestionScraper} = require("./db/question_scraper");
const PORT = process.env.PORT || 8090;

main().then(() => {
    console.log('Server is running');
}).catch((error) => {
    console.log('Server failed to start: ' + error);
});

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_HOST);
        await User.createCollection();
        await QuizToken.createCollection();
        Question.schema.index({title: 'text'});
        await Question.createIndexes();
        await runScraper(true);
        await runQuestionScraper(true);
        await runUserMocker(true);
        await makeServer();
    } catch (error) {
        console.log('Error connecting to MongoDB: ' + error);
    }
}

const makeServer = async () => {
    const server = http.createServer(async (req, res) => {
        // DIY Cors - altfel nu merge swagger
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        const method = req.method;
        console.log(method + ' ' + path);
        // GET /api/laws/:section
        if (method === 'GET' && path.startsWith('/api/laws/')) {
            const section = path.split('/')[3];
            await getLawsBySection(res, req, section);
        }
        //GET /api/indicatoare/:section
        else if (method === 'GET' && path.startsWith('/api/indicatoare')){
            const section = path.split('/')[3];
            await getImageBySection(res, req, section)
        }
        //POST /api/question/random
        else if (method === 'POST' && path === '/api/questions/random') {
            await getRandomQuestion(res, req);
        }
        //GET /api/question/:id
        else if (method === 'GET' && path.startsWith('/api/questions/')) {
            const id = path.split('/')[3];
            const full = parsedUrl.query.full === 'true';
            await getQuestionById(res, req, id,full);
        }
        //POST /api/question/:id
        else if (method === 'POST' && path.startsWith('/api/questions/')) {
            const id = path.split('/')[3];
            await checkQuestionAnswers(res, req, id);
        }
        //POST /api/register
        else if (method === 'POST' && path === '/api/register') {
            await handleRegister(res, req);
        }
        //POST /api/login
        else if (method === 'POST' && path === '/api/login') {
            await handleLogin(res, req);
        }
        //PATCH /api/user
        else if (method === 'PATCH' && path === '/api/users') {
            await handleChangePassword(res, req);
        }
        //GET /api/user/profile
        else if (method === 'GET' && path === '/api/users/profile') {
            await handleUserProfile(res,req);
        }
        //GET /api/users/top
        else if (method ==='GET' && path === '/api/users/top'){
            await getTopUsers(res, req);
        }
        //GET /rss.xml
        else if (method ==='GET' && path === '/rss.xml'){
            await loadRss(res, req);
        }
        //DELETE /api/user/profile
        else if (method ==='DELETE' && path === '/api/users/profile'){
            await deleteUserProgress(res, req); 
        }
        //GET /api/admin
        else if (method === 'GET' && path === '/api/admin') {
            await getAdminDashboard(res, req);
        }
        //GET /api/quiz
        else if (method === 'GET' && path === '/api/quiz') {
            await handleQuiz(res,req);
        }
        //POST /api/quiz/questions/:id
        else if (method === 'POST' && path.startsWith('/api/quiz/questions/')) {
            const id = path.split('/')[4];
            await checkQuizQuestionAnswers(res, req, id);
        }
        //POST /api/questions
        else if (method === 'POST' && path === '/api/questions'){
            await addNewQuestion(res, req);
        }
        //DELETE /api/questions/:id
        else if (method === 'DELETE' && path.startsWith('/api/questions/')){
            const id = path.split('/')[3];
            await deleteQuestionById(res, req, id);
        }
        // GET /api/search?search=...
        else if (method === 'GET' && path === '/api/search') {
            await searchQuestions(res,req,parsedUrl.query.search)
        }
        // GET /api/users.csv
        else if (method === 'GET' && path === '/api/users.csv') {
            await getUsersCSV(res,req);
        }
        // invalid route
        else {
            handleResponse(res, 404, {error: 'Route not found'});
        }
    })
    server.listen(PORT, (error) => {
        if (error) {
            console.log("Something went wrong; error: " + error);
        } else {
            console.log("Server is listening on port " + PORT);
        }
    });
}
