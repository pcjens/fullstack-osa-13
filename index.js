const dotenv = require('dotenv');
const { Sequelize } = require('sequelize')
const express = require('express');
const { Blog } = require('./models');

const app = express()
dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL);

app.use(express.json());

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
    try {
        console.log(req.body);
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    next();
};

app.delete('/api/blogs/:id', blogFinder, async (req, res) => {
    try {
        await req.blog.destroy();
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
