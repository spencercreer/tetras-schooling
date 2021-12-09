const { Sequelize, Model, DataTypes } = require('sequelize')
const { DataTypes, DataTypes, DataTypes, DataTypes, DataTypes, DataTypes } = require('sequelize/dist')
const sequelize = require('../config/config')

class Student extends Models { }

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
        grad_date: {
            type: DataTypes.STRING,
        },
        time_zone: {
            type: DataTypes.STRING,
        },
        slack: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize
    }
)

module.exports = Student