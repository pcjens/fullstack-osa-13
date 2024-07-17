const express = require('express');
const { Blog, User } = require('../models');
const { loggedInUserSetter } = require('../util/auth');

const router = express.Router();

const blogFinder = async (req, res, next) => {
    try {
        req.blog = await Blog.findByPk(req.params.id);
        next();
    } catch (error) {
        next(error);
    }
};

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        include: { model: User },
    });
    res.json(blogs);
});

router.post('/', loggedInUserSetter, async (req, res, next) => {
    try {
        req.body.userId = req.loggedInUser.id;
        console.log(req.body);
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', blogFinder, loggedInUserSetter, async (req, res, next) => {
    try {
        if (req.blog.userId !== req.loggedInUser.id)
            return res.status(401).send({ error: 'cannot delete other users\' blogs' });
        await req.blog.destroy();
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', blogFinder, async (req, res, next) => {
    try {
        req.blog.likes = req.body.likes;
        await req.blog.save();
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
