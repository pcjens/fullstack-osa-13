const dotenv = require('dotenv');
const express = require('express');
const { ValidationError } = require('sequelize');
const { blogRouter, userRouter, loginRouter } = require('./controllers');

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use((error, req, res, next) => {
    if (error instanceof ValidationError) {
        return res.status(400).send({
            error: error.errors.map(({ message }) => message),
        })
    }
    console.error('Error handling request: ' + error.message);
    res.sendStatus(500);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
