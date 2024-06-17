document.getElementById('rss-button').addEventListener('click', function() {
    window.location.href = '/rss.xml';
});


async function fetchAndDisplayRssFeed() {
    try {
        let host = window.location.host;
        let apiPath = 'http://' + host + '/rss.xml';
        
        // fetch the RSS XML
        let response = await fetch(apiPath);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch RSS: ${response.status} ${response.statusText}`);
        }
        
        let rssXml = response;
        
        // open a new window and display the RSS XML
        const rssWindow = window.open("", "_blank");
        rssWindow.document.open();
        rssWindow.document.write('<html><head><title>RSS Feed</title></head><body><pre>' + rssXml.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre></body></html>');
        rssWindow.document.close();
    } catch (error) {
        console.error('Error fetching or displaying RSS:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const rssButton = document.getElementById('rss-button');
    rssButton.addEventListener('click', fetchAndDisplayRssFeed);
});