const express = require('express');
const { Op } = require('sequelize');
const { User, Blog, Reading } = require('../models');
const { sequelize } = require('../util/db');

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

module.exports = router;
