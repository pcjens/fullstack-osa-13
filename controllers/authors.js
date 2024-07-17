const express = require('express');
const { Op } = require('sequelize');
const { Blog } = require('../models');
const { sequelize } = require('../util/db');

const router = express.Router();

router.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
        ],
        where: { author: { [Op.not]: null } },
        group: 'author',
        order: [['likes', 'desc']],
    });
    res.json(authors);
});

module.exports = router;
