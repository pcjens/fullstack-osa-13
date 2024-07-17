const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('blogs', 'year', {
            type: DataTypes.INTEGER,
            allowNull: false,
            // An obviously wrong default value so it gets noticed and fixed
            // while keeping the column not-null. It's outside of the allowed
            // range of 1991-$currentyear to make it obvious that it was set by
            // this migration.
            defaultValue: 1444,
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('blogs', 'year');
    },
};
