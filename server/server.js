require('dotenv').config();
const mongoose = require('mongoose');
const getLawsBySection = require('./controllers/law_controller').getLawsBySection;
const getImageBySection = require('./controllers/image_controller').getImageBySection;
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
    })
    server.listen(PORT, (error) => {
        if (error) {
            console.log("Something went wrong; error: " + error);
        } else {
            console.log("Server is listening on port " + PORT);
        }
    });
}
