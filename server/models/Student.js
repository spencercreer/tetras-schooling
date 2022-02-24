const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../config/config')

class Student extends Model { }

Student.init(
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
        class_code: {
            type: DataTypes.STRING
        },
        grad_date: {
            type: DataTypes.STRING,
        },
        time_zone: {
            type: DataTypes.STRING,
        },
        slack: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize
    }
)

module.exports = Student