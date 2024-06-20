const handleResponse = require('../utils/handleResponse');
const User = require('../models/user_model');
const {handleToken, generateToken} = require("../utils/tokenUtils");
const {topUsers} = require("../utils/getTopUsers");
const {cleanXmlString, removeNewlines} = require("../utils/xmlUtils");
const handleHtmlResponse = require("../utils/handleHtmlResponse");
const fs = require('fs');
const path = require('path');

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

const deleteQuizInfo = async (res, req) => {
    const payload = await handleToken(res, req);
    if (!payload) {
        return;
    }

    try {
        const user = await User.findOneAndUpdate(
            { username: payload.username },
            {
                questionsAnswered: [],
                quizScoreTotal: 0,
                quizScoreCount: 0,
                quizScores: []
            },
            { new: true }
        );

        if (!user) {
            handleResponse(res, 404, { error: 'User not found' });
            return;
        }

        // success
        handleResponse(res, 200, { message: 'User quiz profile reset successfully' });
    } catch (err) {
        console.error('Error:', err);
        handleResponse(res, 500, { error: 'Internal server error' });
    }
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
        const top = await topUsers();
        handleResponse(res, 200, top);
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




const getAdminDashboard = async (res, req) => {
    const payload = await handleToken(res, req);
    if (!payload) {
        return;
    }
    if (!payload.isAdmin) {
        handleResponse(res, 403, {error: 'Unauthorized'});
        return;
    }
    try {
        let data = fs.readFileSync(path.join(__dirname, '../views/admin-dashboard.html'),'utf8');
        data = cleanXmlString(data);
        data = removeNewlines(data);
        handleHtmlResponse(res, 200, data);
    } catch (error) {
        console.error('Error fetching users:', error);
        handleResponse(res, 500, {error: 'Error fetching dashboard'});
    }
}

module.exports = {
    handleRegister,
    handleLogin,
    handleChangePassword,
    getTopUsers,
    deleteQuizInfo,
    handleUserProfile,
    getAdminDashboard
}