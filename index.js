const dotenv = require('dotenv');
const { Sequelize } = require('sequelize')
const express = require('express');
const { Blog, init: initBlog } = require('./models/Blog');

const app = express()
dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL);

initBlog(sequelize);

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

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        await blog.destroy();
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
