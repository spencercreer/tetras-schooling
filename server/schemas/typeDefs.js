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
    }

    type Query {
        getStudents: [Student]
        getStudent(id: Int!): Student
    }

    type Mutation {
        addStudent(studentData: StudentInput!): Student
        updateStudent(id: Int!, studentData: StudentInput!): Student
        updateStatuses(studentsData: [StudentInput]): [Student]
    }
`

module.exports = typeDefs