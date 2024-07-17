const dotenv = require('dotenv');

dotenv.config();

if (!process.env.SECRET) {
    console.warn('[INSECURE MODE] Environment variable SECRET is not defined so json web tokens can be faked.');
}

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 3001,
    SECRET: process.env.SECRET || 'secret missing',
};
