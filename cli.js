const dotenv = require('dotenv');
const { Sequelize } = require('sequelize')
const express = require('express');
const { Blog, init: initBlog } = require('./models/blog');

const app = express()
dotenv.config();


async function main() {
    const sequelize = new Sequelize(process.env.DATABASE_URL);
    initBlog(sequelize);

    const blogs = await Blog.findAll();
    for (const blog of blogs) {
        const { author, title, likes } = blog.toJSON();
        console.log(`${author}: '${title}', ${likes} likes`);
    }

    sequelize.close();
}

main();
