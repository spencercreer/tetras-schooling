const { AuthenticationError } = require('apollo-server-express')
const { Student, Tutor, Session } = require('../models')

const resolvers = {
    Query: {
        getAllStudents: async () => {
            const students = await Student.findAll()

            return students
        },

        getStudentsByParam: async (parent, { parameter, val }) => {
            let what = {}
            what[parameter] = val
            const students = await Student.findAll({
                where: what
            })

            return students
        },

        getStudent: async (parent, { id }) => {
            const student = await Student.findOne({
                where: { id }
            })

            return student
        },

        getTutorSessions: async (parent, { tutorId }) => {
            const sessions = await Session.findAll({
                where: { tutor_id: tutorId },
                include: [Tutor, Student],
                order: [['date', 'DESC']]
            })

            return sessions
        },

        getSession: async (parent, { id }) => {
            const session = await Session.findOne({
                where: { id },
                include: [Tutor, Student],
            })

            return session
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
        },

        addSession: async (parent, { sessionData }) => {
            const { date, student_id, tutor_id } = sessionData
            const session = await Session.create({
                date,
                student_id,
                tutor_id
            })
            return session
        },

        updateSession: async (parent, { sessionData }) => {
            const { id, presession_conf } = sessionData
            const sessionUpdated = await Session.update({
                presession_conf
            },
            {
                where: { id }
            })

            return sessionData
        }
    }
}

module.exports = resolvers