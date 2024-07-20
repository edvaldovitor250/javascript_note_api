const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const withAuth = (req,res, next) =>{
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(403).json({
            success:false,
            message: 'No token provided'
        })
    }

    const decoded = jwt.decode(token)

    if(!decoded || !decoded.user || !decoded.user.id) {
        return res.status(403).json({
            success: false,
            message: 'Token invalid'
        })
    }

    req.userId = decoded.user.id

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
}

module.exports = withAuth;