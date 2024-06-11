require('dotenv').config();
const mongoose = require('mongoose');

const getLawsBySection = require('./controllers/law_controller').getLawsBySection;
const getImageBySection = require('./controllers/image_controller').getImageBySection;
const getRandomQuestion = require('./controllers/question_controller').getRandomQuestion;
const getQuestionById = require('./controllers/question_controller').getQuestionById;
const checkQuestionAnswers = require('./controllers/question_controller').checkQuestionAnswers;

const http = require('http');
const url = require('url');
const PORT = process.env.PORT || 3456;

main().then(() => {
    console.log('Server is running');
}).catch((error) => {
    console.log('Server failed to start: ' + error);
});

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_HOST);
        await makeServer();
    } catch (error) {
        console.log('Error connecting to MongoDB: ' + error);
    }
}

const makeServer = async () => {
    const server = http.createServer(async (req, res) => {
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
        
        //GET /api/question/random
        else if(method === 'GET' && path === '/api/question/random'){
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
            let body = '';
        
            req.on('data', chunk => {
                body += chunk.toString();
            });
        
            req.on('end', async () => {
                //try-catch since the body might now be always a valid int
                try {
                    const parsedBody = JSON.parse(body);
                    if (!Array.isArray(parsedBody.answers) || !parsedBody.answers.every(Number.isInteger)) {
                        throw new Error('Invalid input');
                    }
                    const { answers } = parsedBody;
                    await checkQuestionAnswers(res, id, answers);
                } catch (error) {
                    console.error('Invalid input:', error);
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid input: answers must be an array of integers' }));
                }
            });
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
