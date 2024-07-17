const express = require('express');
const { Reading } = require('../models');
const { loggedInUserSetter } = require('../util/auth');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { blog_id: blogId, user_id: userId } = req.body;
        const newReading = await Reading.create({ read: false, userId, blogId });
        res.json(newReading);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', loggedInUserSetter, async (req, res, next) => {
    try {
        const reading = await Reading.findByPk(req.params.id);
        if (reading.userId !== req.loggedInUser.id)
            return res.status(401).json({ error: 'only the owner of the reading entry can change its read status' });
        reading.read = req.body.read;
        await reading.save();
        res.json(reading);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
