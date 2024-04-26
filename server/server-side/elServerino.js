const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3456;

const server = http.createServer((request, response) => {

    response.writeHead(200, {"Content-Type" : "text/html"});
    response.end("<h1>Hello, world !<h1>");

    console.log("it's ok to be ghe");
});

server.listen(PORT, function(error){
    if(error){
        console.log("Something went wrong; error: " + error);
    } else {
        console.log("Server is listening on port " + PORT);
    }
});