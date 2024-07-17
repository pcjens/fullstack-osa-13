const jwt = require('jsonwebtoken')
const express = require('express');
const { SECRET } = require('../util/config');
const User = require('../models/user')

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

    const userForToken = {
        username: user.username,
        id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    response.status(200)
        .send({ token, username: user.username, name: user.name });
})

module.exports = router;
