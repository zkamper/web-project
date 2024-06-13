require('dotenv').config();
const mongoose = require('mongoose');
const {getLawsBySection} = require('./controllers/law_controller');
const {getImageBySection} = require('./controllers/image_controller');
const {getRandomQuestion, getQuestionById, checkQuestionAnswers} = require('./controllers/question_controller');
const {handleLogin, handleRegister, handleChangePassword, getTopUsers, handleUserProfile} = require("./controllers/user_controller");

const User = require('./models/user_model');

const http = require('http');
const url = require('url');
const handleResponse = require("./utils/handleResponse");
const Question = require("./models/question_model");

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
        await makeServer();
    } catch (error) {
        console.log('Error connecting to MongoDB: ' + error);
    }
}

const makeServer = async () => {
    const server = http.createServer(async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        const method = req.method;
        console.log("path: " + path + " method: " + method);
        // GET /api/laws/:section
        if (method === 'GET' && path.startsWith('/api/laws/')) {
            const section = path.split('/')[3];
            await getLawsBySection(res, req, section);
        }
        else if (method === 'GET' && path.startsWith('/api/indicatoare')){
            const section = path.split('/')[3];
            await getImageBySection(res, req, section)
        } 
        
        //POST /api/question/random with argument validation
        else if (method === 'POST' && path === '/api/question/random') {
            await getRandomQuestion(res, req);
        }

        //GET /api/question/:id
        else if (method === 'GET' && path.startsWith('/api/question/')) {
            const id = path.split('/')[3];
            await getQuestionById(res, req, id);
        }

        //POST /api/question/:id
        else if (method === 'POST' && path.startsWith('/api/question/')) {
            const id = path.split('/')[3];
            await checkQuestionAnswers(res, req, id);
        }
        else if (method === 'POST' && path === '/api/register') {
            await handleRegister(res, req);
        }
        else if (method === 'POST' && path === '/api/login') {
            await handleLogin(res, req);
        }
        else if (method === 'PATCH' && path === '/api/user') {
            await handleChangePassword(res, req);
        }
        else if (method === 'GET' && path === '/api/user/profile') {
            await handleUserProfile(res,req);
        }

        //GET /api/users/top
        else if (method ==='GET' && path === '/api/users/top'){
            await getTopUsers(res, req);
        }

        //all the other requests
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not found' }));
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
