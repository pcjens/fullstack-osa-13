const dotenv = require('dotenv');
const express = require('express');
const { Blog } = require('./models');

const app = express()
dotenv.config();

app.use(express.json());

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

app.post('/api/blogs', async (req, res, next) => {
    try {
        console.log(req.body);
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (error) {
        next(error);
    }
});

const blogFinder = async (req, res, next) => {
    try {
        req.blog = await Blog.findByPk(req.params.id);
        next();
    } catch (error) {
        next(error);
    }
};

app.delete('/api/blogs/:id', blogFinder, async (req, res, next) => {
    try {
        await req.blog.destroy();
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

app.put('/api/blogs/:id', blogFinder, async (req, res, next) => {
    try {
        req.blog.likes = req.body.likes;
        await req.blog.save();
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    console.error('Error handling request: ' + error.message);
    res.sendStatus(500);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
