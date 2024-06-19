const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const handleResponse = require("./handleResponse");
const crypto = require("crypto")

function generateQuizToken() {
    return crypto.randomBytes(16).toString('hex');
}

function generateToken(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, {expiresIn});
}

async function verifyToken(token) {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({username: payload.username});
        if (!user) {
            return false;
        }
        return payload;
    } catch (_) {
        return false;
    }
}

async function handleToken(res, req) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        handleResponse(res, 401, {error: 'Unauthorized'});
        return;
    }
    const token = authorization.split(' ')[1];

    const payload = await verifyToken(token);
    if (!payload) {
        handleResponse(res, 401, {error: 'Unauthorized'});
        return;
    }
    return payload;
}

module.exports = {generateToken, handleToken, generateQuizToken};