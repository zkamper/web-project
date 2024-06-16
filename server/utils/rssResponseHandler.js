const handleRssResponse = (res, statusCode, rssFeed) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/rss+xml' });
    //res.end(JSON.stringify(rssFeed));
    res.end(rssFeed);
};

module.exports = handleRssResponse;