const dotenv = require('dotenv');
const express = require('express');
const { ValidationError } = require('sequelize');
const { blogRouter, userRouter, loginRouter, authorRouter, readinglistRouter } = require('./controllers');
const db = require('./util/db');

dotenv.config();
const PORT = process.env.PORT || 3001;


const app = express();

app.use(express.json());
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readinglistRouter);
app.use((error, req, res, next) => {
    if (error instanceof ValidationError) {
        return res.status(400).send({
            error: error.errors.map(({ message }) => message),
        })
    }
    console.error('Error handling request: ' + error.message);
    res.sendStatus(500);
});

db.connectToDatabase()
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}.`);
    }));
