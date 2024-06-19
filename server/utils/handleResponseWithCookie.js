const handleResponseWithCookie = (res, statusCode, data, cookie) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json', 'Set-Cookie': cookie });
    res.end(JSON.stringify(data));
}

module.exports = handleResponseWithCookie;