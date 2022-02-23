const { AuthenticationError } = require('apollo-server-express')
const { Student } = require('../models')

const resolvers = {
    Query: {
        getStudent: async (parent, args, context) => {
            const studentData = await Student.findAll()

            return studentData
        }
    }


}

module.exports = resolvers