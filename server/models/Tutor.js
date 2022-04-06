const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/config')

class Tutor extends Model { }

Tutor.init(
    {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time_zone: {
            type: DataTypes.STRING,
        },
        slack: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize
    }
)

module.exports = Tutor