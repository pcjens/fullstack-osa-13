const Sequelize = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL);

const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: { glob: 'migrations/*.js' },
        storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
        context: sequelize.getQueryInterface(),
        logger: console,
    });
    const migrations = await migrator.up();
    console.log('Migrations up to date', { files: migrations.map((mig) => mig.name) });
};

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await runMigrations();
        console.log('database connected');
    } catch (err) {
        console.log('connecting to the database failed:', err);
        process.exit(1);
    }
};

module.exports = { connectToDatabase, sequelize };
