const jwt = require('jsonwebtoken')
const express = require('express');
const { SECRET } = require('../util/config');
const { User, Session } = require('../models')
const { loggedInUserSetter } = require('../util/auth');

const router = express.Router();

router.post('/', async (request, response) => {
    const { username, password } = request.body;
    const user = await User.findOne({ where: { username } });

    const passwordCorrect = password === 'salainen';
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password',
        });
    }

    const session = await Session.create({ user_id: user.id });
    const userForToken = {
        username: user.username,
        id: user.id,
        sessionId: session.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    response.status(200)
        .send({ token, username: user.username, name: user.name });
})

router.delete('/', loggedInUserSetter, async (req, res) => {
    const sessions = await Session.findAll({ where: { userId: req.loggedInUser.id } })
    await Promise.all(sessions.map((session) => session.destroy()));
    res.sendStatus(200);
})

module.exports = router;
