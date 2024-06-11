const handleResponse = require('../utils/handleResponse');
const User = require('../models/user_model');
const jwt = require("jsonwebtoken");

const handleRegister = async (res,req) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        if(body === '') {
            handleResponse(res, 400, {error: 'Invalid input: body is empty'});
            return;
        }
        try {
            const parsedBody = JSON.parse(body);
            const { username, email, password } = parsedBody;
            let exists = await User.exists({ username });
            if (exists) {
                handleResponse(res, 400, {error: 'Username already exists'});
                return;
            }
            exists = await User.exists({ email });
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

function generateToken(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, { expiresIn });
}

const handleLogin = async (res, req) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        if(body === '') {
            handleResponse(res, 400, {error: 'Invalid input: body is empty'});
            return;
        }
        try {
            const parsedBody = JSON.parse(body);
            const { email, password } = parsedBody;
            let user = await User.findOne({ email });
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

module.exports = {
    handleRegister,
    handleLogin
}