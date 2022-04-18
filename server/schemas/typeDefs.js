const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Tutor {
        id: Int!
        first_name: String
        last_name: String
        email: String
        password: String
        time_zone: String
        slack: String
    }

    type Student {
        id: Int!
        first_name: String
        last_name: String
        email: String
        class_code: String
        grad_date: String
        time_zone: String
        slack: String
        status: String
        github: String
        tutor_id: Int
    }

    input StudentInput {
        id: Int
        first_name: String
        last_name: String
        email: String
        class_code: String
        grad_date: String
        time_zone: String
        slack: String
        status: String
        github: String
    }

    type Session {
        id: Int
        date: String
        clock_in: String
        clock_out: String
        notes_added: Boolean
        b2b: Boolean
        presession_conf: Boolean
        tutor_eval: Boolean
        show: Boolean
        topics: String
        notes: String
        payment_amount: Float
        payment_date: String
        tutor_id: Int
        student_id: Int
        Tutor: Tutor
        Student: Student
    }

    input SessionInput {
        id: Int
        date: String
        clock_in: String
        clock_out: String
        notes_added: Boolean
        b2b: Boolean
        presession_conf: Boolean
        tutor_eval: Boolean
        show: Boolean
        topics: String
        notes: String
        payment_amount: Float
        payment_date: String
        tutor_id: Int
        student_id: Int
    }

    

    type Query {
        getStudents: [Student]
        getStudent(id: Int!): Student
        getTutorSessions(tutorId: Int!): [Session]
    }

    type Mutation {
        addStudent(studentData: StudentInput!): Student
        updateStudent(id: Int!, studentData: StudentInput!): Student
        updateStatuses(studentsData: [StudentInput]): [Student]
        addSession(sessionData: SessionInput!): Session
        updateSession(sessionData: SessionInput!): Session
    }
`

module.exports = typeDefs