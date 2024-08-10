const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

const withAuth = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'No token provided'
        });
    }

    // Prefixo 'Bearer ' pode estar presente no token
    const formattedToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    if (!process.env.JWT_TOKEN) {
        console.error('JWT_TOKEN is not defined');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    let decoded;
    try {
        decoded = jwt.verify(formattedToken, process.env.JWT_TOKEN); 
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({
            success: false,
            message: 'Token invalid'
        });
    }

    if (!decoded || !decoded.user || !decoded.user.id) {
        return res.status(403).json({
            success: false,
            message: 'Token invalid'
        });
    }

    req.userId = decoded.user.id;

    User.findById(decoded.user.id)
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            req.user = user;
            next();
        })
        .catch(err => {
            console.error('Failed to find user:', err.message);
            res.status(500).json({ error: 'Failed to find user' });
        });
};

module.exports = withAuth;
