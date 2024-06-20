const handleHtmlResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(data);
}


module.exports = handleHtmlResponse;