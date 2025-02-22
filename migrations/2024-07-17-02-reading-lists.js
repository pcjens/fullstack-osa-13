const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('readings', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            created_at: { type: DataTypes.DATE, allowNull: false },
            updated_at: { type: DataTypes.DATE, allowNull: false },
            read: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
            blog_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'blogs', key: 'id' } },
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('readings');
    },
};
