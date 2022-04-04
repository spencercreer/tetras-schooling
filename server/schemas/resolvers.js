const { AuthenticationError } = require('apollo-server-express')
const { Student } = require('../models')
const { update } = require('../models/Student')

const resolvers = {
    Query: {
        getStudents: async () => {
            const students = await Student.findAll()

            return students
        },

        getStudent: async (parent, { id }) => {
            const student = await Student.findOne({
                where: { id }
            })

            return student
        }
    },

    Mutation: {
        addStudent: async (parent, { studentData }) => {
            const { first_name, last_name, email, class_code, grad_date, time_zone, slack, status } = studentData
            const newStudent = await Student.create({
                first_name,
                last_name,
                email,
                class_code,
                grad_date,
                time_zone,
                slack,
                status
            })

            return newStudent
        },
        
        updateStudent: async (parent, { id, studentData }) => {
            const { first_name, last_name, email, class_code, grad_date, time_zone, slack, status } = studentData
            const studentUpdated = await Student.update({
                first_name,
                last_name,
                email,
                class_code,
                grad_date,
                time_zone,
                slack,
                status
            },
            {
                where: { id },
            })

            const student = await Student.findOne({
                where: { id }
            })

            return student
        },

        updateStatuses: (parent, { studentsData }) => {
            studentsData.forEach(async (student) => {
                const studentUpdated = await Student.update({
                    status: student.status
                },
                {
                    where: { id: student.id }
                })
            })
            return studentsData
        }
    }


}

module.exports = resolvers