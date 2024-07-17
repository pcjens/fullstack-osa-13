const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('./config')

const loggedInUserSetter = async (req, res, next) => {
    const auth = req.get('authorization');
    if (!(auth && auth.startsWith('Bearer ')))
        return res.status(401).json({ error: 'token missing' });

    const token = jwt.verify(auth.replace('Bearer ', ''), config.SECRET);
    if (!token.id)
        return res.status(401).json({ error: 'invalid token' });

    req.loggedInUser = token;
    next();
};

module.exports = { loggedInUserSetter };
