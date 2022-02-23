const sequelize = require('../config/config')
const Student = require('../models/Student.js')

const studentData = require('./studentData.json')

const seedDatabase = async () =>{
    await sequelize.sync({ force: true })
    
    const students = await Student.bulkCreate(studentData, {
        individualHooks: true,
        returning: true,
    })

    process.exit(0)
}

seedDatabase()