const { AuthenticationError } = require('apollo-server-express')
const { Student } = require('../models')

const resolvers = {
    Query: {
        getStudent: async (parent, args, context) => {
            const studentData = await Student.findAll()

            return studentData
        }
    },

    Mutation: {
        addStudent: async (parent, args) => {
            const student = await Student.create(args)

            return { student }
        },
        // updateStudent: async (parent, { studentData }) => {

        // }
    }


}

module.exports = resolvers