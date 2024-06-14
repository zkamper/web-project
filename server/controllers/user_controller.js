const handleResponse = require('../utils/handleResponse');
const User = require('../models/user_model');
const {handleToken, generateToken} = require("../utils/tokenUtils");

const handleRegister = async (res, req) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        if (body === '') {
            handleResponse(res, 400, {error: 'Invalid input: body is empty'});
            return;
        }
        try {
            const parsedBody = JSON.parse(body);
            let {username, email, password} = parsedBody;
            username = username.toLowerCase();
            email = email.toLowerCase();
            let exists = await User.exists({username});
            if (exists) {
                handleResponse(res, 400, {error: 'Username already exists'});
                return;
            }
            exists = await User.exists({email});
            if (exists) {
                handleResponse(res, 400, {error: 'Email already exists'});
                return;
            }
            const user = new User({
                username: username,
                email: email,
                hashedPassword: password
            })
            await user.save();
            handleResponse(res, 201, {message: 'User created'});
        } catch (error) {
            console.error('Invalid input:', error);
            handleResponse(res, 400, {error: 'Invalid input: body must be a valid JSON'});
        }
    });
}


const handleUserProfile = async (res, req) => {
    const payload = await handleToken(res, req);
    if (!payload) {
        return;
    }
    try {
        const {username} = payload;
        const user = await User.findOne({username});
        if (!user) {
            handleResponse(res, 404, {error: 'User not found'});
            return;
        }
        handleResponse(res, 200, {
            username: user.username,
            questionsAnswered: user.questionsAnswered,
            quizScoreTotal: user.quizScoreTotal,
            quizScoreCount: user.quizScoreCount,
            quizScores: user.quizScores
        })
    } catch (error) {
        console.error('Invalid input:', error);
        handleResponse(res, 500, {error: 'Error fetching user profile'});
    }
}

const handleLogin = async (res, req) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        if (body === '') {
            handleResponse(res, 400, {error: 'Invalid input: body is empty'});
            return;
        }
        try {
            const parsedBody = JSON.parse(body);
            let {email, password} = parsedBody;
            email = email.toLowerCase();
            let user = await User.findOne({email});
            if (!user) {
                handleResponse(res, 400, {error: 'Invalid credentials'});
                return;
            }
            if (user.hashedPassword !== password) {
                handleResponse(res, 400, {error: 'Invalid credentials'});
                return;
            }
            const token = generateToken({
                username: user.username,
                isAdmin: user.isAdmin
            }, process.env.JWT_SECRET, '7d');
            handleResponse(res, 200, {
                message: 'Login successful',
                token: token
            });
        } catch (error) {
            console.error('Invalid input:', error);
            handleResponse(res, 400, {error: 'Invalid input: body must be a valid JSON'});
        }
    });
}

const getTopUsers = async (res, req) => {
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

        handleResponse(res, 200, topUsers);
    } catch (error) {
        console.error("Error fetching top users:", error);
        handleResponse(res, 500, { error: "Error fetching top users" });
    }
};

const handleChangePassword = async (res, req) => {
    let body = '';
    const payload = await handleToken(res, req);
    if (!payload) {
        return;
    }
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        if (body === '') {
            handleResponse(res, 400, {error: 'Invalid input: body is empty'});
            return;
        }
        try {
            const parsedBody = JSON.parse(body);
            const {oldPassword, newPassword} = parsedBody;
            if (oldPassword === newPassword) {
                handleResponse(res, 400, {error: 'New password must be different from the old password'});
                return;
            }
            const {username} = payload;
            const user = await User.findOne({username});
            if (oldPassword !== user.hashedPassword) {
                handleResponse(res, 400, {error: 'Invalid credentials'});
                return;
            }
            user.hashedPassword = newPassword;
            await user.save();
            handleResponse(res, 200, {message: 'Password changed'});
        } catch (error) {
            console.error('Invalid input:', error);
            handleResponse(res, 400, {error: 'Invalid input: body must be a valid JSON'});
        }
    });
}

module.exports = {
    handleRegister,
    handleLogin,
    handleChangePassword,
    getTopUsers,
    handleUserProfile
}