const handleRssResponse = require("../utils/rssResponseHandler");
const handleResponse = require("../utils/handleResponse");
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const {topUsers} = require("../utils/getTopUsers");

const getTopUsers = async () => {
    try {
        return await topUsers();
    } catch (error) {
        console.error("Error fetching top users:" + error);
    }
};

const removeNewlines = (str) => {
    return str.replace(/[\r\n]+/g, '');
};

const cleanXmlString = (xmlString) => {
    let cleanedString = xmlString.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, '').replace(/\\t/g, '');
    cleanedString = cleanedString.replace(/\\/g, '');
    cleanedString = cleanedString.split('\n').map(line => line.trim()).join('\n');
    return cleanedString;
};

const loadRss = async (res, req) => {
    try {
        const topUsers = await getTopUsers();
        const lastBuildDate = moment().tz('Europe/Bucharest').format('ddd, DD MMM YYYY HH:mm:ss ZZ');

        //read RSS template
        const templatePath = path.join(__dirname, '../templates/rssTemplate.xml');
        let rssTemplate = fs.readFileSync(templatePath, 'utf8');

        //fill the template
        let items = topUsers.map((user) => {
            // generate a unique GUID for each item
            const guid = `http://localhost/mediu-invatare/${uuidv4()}`;

            return `<item>
                <title><![CDATA[${user.username}]]></title>
                <link>http://localhost/mediu-invatare</link>
                <guid>${guid}</guid>
                <description><![CDATA[Score: ${user.score.toFixed(2)}]]></description>
            </item>`;
        }).join('');

        // replace placeholders in the template
        rssTemplate = rssTemplate
            .replace('{{lastBuildDate}}', lastBuildDate)
            .replace('{{items}}', items);

        rssTemplate = cleanXmlString(rssTemplate);
        rssTemplate = removeNewlines(rssTemplate);
        
        // send the RSS feed 
        handleRssResponse(res, 200, rssTemplate);

    } catch (error) {
        console.error("Error generating RSS feed: " + error);
        handleResponse(res, 500, { error: "Error generating RSS feed" });
    }
};

module.exports = loadRss;