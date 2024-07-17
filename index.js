const dotenv = require('dotenv');
const express = require('express');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use((error, req, res, next) => {
    console.error('Error handling request: ' + error.message);
    res.sendStatus(500);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
