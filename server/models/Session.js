const { Model, DataTypes, BOOLEAN } = require('sequelize')
const sequelize = require('../config/config')

class Session extends Model { }

Session.init(
    {
        date: {
            type: DataTypes.DATE,
        },
        time_in: {
            type: DataTypes.DATE,
        },
        time_out: {
            type: DataTypes.DATE,
        },
        notes_added: {
            type: DataTypes.BOOLEAN,
        },
        b2b: {
            type: DataTypes.BOOLEAN,
        },
        presession_conf: {
            type: DataTypes.BOOLEAN,
        },
        tutor_eval: {
            type: DataTypes.BOOLEAN,
        },
        show: {
            type: DataTypes.BOOLEAN,
        },
        topics: {
            type: DataTypes.STRING,
        },
        notes: {
            type: DataTypes.STRING,
        },
        payment_amount: {
            type: DataTypes.DECIMAL,
        },
        payment_date: {
            type: DataTypes.DATE,
        }
    },
    {
        sequelize
    }
)

module.exports = Session