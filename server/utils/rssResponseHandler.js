const handleRssResponse = (res, statusCode, rssFeed) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/xml' });
    //res.end(JSON.stringify(rssFeed));
    res.end(rssFeed);
};

module.exports = handleRssResponse;