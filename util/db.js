const Sequelize = require('sequelize');
const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('database connected');
    } catch (err) {
        console.log('connecting to the database failed');
        process.exit(1);
    }
};

module.exports = { connectToDatabase, sequelize };
