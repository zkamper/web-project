const handleRssResponse = require("../utils/rssResponseHandler");
const handleResponse = require("../utils/handleResponse");
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');
const User = require('../models/user_model');

const getTopUsers = async () => {
    try {
        const topUsers = await User.aggregate([
            {
                $match: {
                    quizScoreCount: { $gt: 0 }
                }
            },
            {
                $addFields: {
                    average: { $divide: ["$quizScoreTotal", "$quizScoreCount"] },
                    p1: { $divide: [{ $divide: ["$quizScoreTotal", "$quizScoreCount"] }, 26] },
                    p2: { $divide: [{ $size: "$questionsAnswered" }, 1000] }
                }
            },
            {
                $addFields: {
                    score: { 
                        $add: [
                            { $multiply: ["$p1", 99] },
                            { $multiply: ["$p2", 1] }
                        ]
                    }
                }
            },
            {
                $sort: { score: -1 }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    _id: 0,
                    username: 1,
                    score: { $round: ["$score", 2] }
                }
            }
        ]);

        return topUsers; 
    } catch (error) {
        console.error("Error fetching top users:" + error);
    }
};

const removeNewlines = (str) => {
    return str.replace(/[\r\n]+/g, '');
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
            return `<item>
            <title><![CDATA[${user.username}]]></title>
            <link>http://localhost/mediu-invatare</link>
            <guid>http://localhost/mediu-invatare</guid>
            <description><![CDATA[Score: ${user.score.toFixed(2)}]]></description>
            </item>`;
        }).join('');

        // Replace placeholders in the template
        rssTemplate = rssTemplate
            .replace('{{lastBuildDate}}', lastBuildDate)
            .replace('{{items}}', items);

        rssTemplate = removeNewlines(rssTemplate);

        // send the RSS feed 
        handleRssResponse(res, 200, rssTemplate);

    } catch (error) {
        console.error("Error generating RSS feed: " + error);
        handleResponse(res, 500, { error: "Error generating RSS feed" });
    }
};

module.exports = loadRss;