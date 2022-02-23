const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Student {
        _id: ID!
        first_name: String
    }

    type Query {
        getStudent: Student
    }
`

module.exports = typeDefs