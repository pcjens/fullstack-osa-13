const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Reading extends Model { }

Reading.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    read: { type: DataTypes.BOOLEAN, allowNull: false, default: false },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    blogId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'blogs', key: 'id' } },
}, {
    sequelize,
    underscored: true,
});

module.exports = Reading;
