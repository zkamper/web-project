const User = require("../models/user_model");
const topUsers = async () => {
    return User.aggregate([
        {
            $match: {
                quizScoreCount: {$gt: 0}
            }
        },
        {
            $addFields: {
                average: {$divide: ["$quizScoreTotal", "$quizScoreCount"]},
                p1: {$divide: [{$divide: ["$quizScoreTotal", "$quizScoreCount"]}, 26]},
                p2: {$divide: [{$size: "$questionsAnswered"}, 1000]}
            }
        },
        {
            $addFields: {
                score: {
                    $add: [
                        {$multiply: ["$p1", 99]},
                        {$multiply: ["$p2", 1]}
                    ]
                }
            }
        },
        {
            $sort: {score: -1}
        },
        {
            $limit: 5
        },
        {
            $project: {
                _id: 0,
                username: 1,
                score: {$round: ["$score", 2]}
            }
        }
    ]);
}

module.exports = { topUsers };