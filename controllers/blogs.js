const express = require('express');
const { Blog } = require('../models');

const router = express.Router();

const blogFinder = async (req, res, next) => {
    try {
        req.blog = await Blog.findByPk(req.params.id);
        next();
    } catch (error) {
        next(error);
    }
};

router.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

router.post('/api/blogs', async (req, res, next) => {
    try {
        console.log(req.body);
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (error) {
        next(error);
    }
});

router.delete('/api/blogs/:id', blogFinder, async (req, res, next) => {
    try {
        await req.blog.destroy();
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.put('/api/blogs/:id', blogFinder, async (req, res, next) => {
    try {
        req.blog.likes = req.body.likes;
        await req.blog.save();
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
