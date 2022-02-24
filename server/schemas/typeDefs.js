const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Student {
        id: ID!
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
        getStudent: [Student]
    }
`

module.exports = typeDefs