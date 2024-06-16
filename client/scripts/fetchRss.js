async function fetchAndDisplayRssFeed() {
    try {
        let host = window.location.host;
        let apiPath = 'http://' + host + '/rss.xml';
        
        // Fetch the RSS XML
        let response = await fetch(apiPath);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch RSS: ${response.status} ${response.statusText}`);
        }
        
                // Open a new window and display the RSS XML
                const rssWindow = window.open();
                rssWindow.document.write(`<pre>${rssXml}</pre>`);
    } catch (error) {
        console.error('Error fetching or displaying RSS:' + error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const rssButton = document.getElementById('rss-button');
    rssButton.addEventListener('click', fetchAndDisplayRssFeed);
});


/*async function fetchAndDisplayRssFeed() {
    try {
        let host = window.location.host;
        let apiPath = 'http://' + host + '/rss.xml';
        
        // Fetch the RSS XML
        let response = await fetch(apiPath);
        
        // Check if fetch was successful
        if (!response.ok) {
            throw new Error(`Failed to fetch RSS: ${response.status} ${response.statusText}`);
        }
        
        // Read the response as text (assuming it's XML)
        let rssXml = await response.text();
        
        // Parse XML
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(rssXml, 'application/xml');
        
        // Check for parsing errors
        if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
            throw new Error('Error parsing RSS XML');
        }
        
        // Clear existing content or create a new container for displaying the RSS
        let rssContainer = document.getElementById('rss-container');
        if (!rssContainer) {
            rssContainer = document.createElement('div');
            rssContainer.id = 'rss-container';
            document.body.appendChild(rssContainer);
        } else {
            rssContainer.innerHTML = ''; // Clear existing content
        }
        
        // Create HTML elements to display RSS data
        let titleElement = document.createElement('h2');
        titleElement.textContent = xmlDoc.querySelector('title').textContent;
        rssContainer.appendChild(titleElement);
        
        let descriptionElement = document.createElement('p');
        descriptionElement.textContent = xmlDoc.querySelector('description').textContent;
        rssContainer.appendChild(descriptionElement);
        
        // Display items
        let items = xmlDoc.querySelectorAll('item');
        items.forEach(item => {
            let itemElement = document.createElement('div');
            itemElement.classList.add('rss-item');
            itemElement.innerHTML = `
                <h3>${item.querySelector('title').textContent}</h3>
                <p>${item.querySelector('description').textContent}</p>
                <a href="${item.querySelector('link').textContent}" target="_blank">Read more</a>
            `;
            rssContainer.appendChild(itemElement);
        });
        
    } catch (error) {
        console.error('Error fetching or displaying RSS:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const rssButton = document.getElementById('rss-button');
    if (rssButton) {
        rssButton.addEventListener('click', fetchAndDisplayRssFeed);
    }
});*/