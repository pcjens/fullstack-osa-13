const jwt = require('jsonwebtoken');
const { User, Session } = require('../models');
const config = require('./config')

const loggedInUserSetter = async (req, res, next) => {
    const auth = req.get('authorization');
    if (!(auth && auth.startsWith('Bearer ')))
        return res.status(401).json({ error: 'token missing' });

    const token = jwt.verify(auth.replace('Bearer ', ''), config.SECRET);
    if (!token.id)
        return res.status(401).json({ error: 'invalid token' });

    const session = await Session.findByPk(token.sessionId, {
        include: {
            model: User,
        }
    });
    if (!session)
        return res.status(401).json({ error: 'expired or logged out session' });
    if (session.user.disabled)
        return res.status(401).json({ error: 'this account has been disabled' });

    req.loggedInUser = token;
    next();
};

module.exports = { loggedInUserSetter };
