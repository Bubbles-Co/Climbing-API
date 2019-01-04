const { gql } = require('apollo-server-express')
const { fetchGrades } = require('../src/db/grade')

const typeDefs = gql`
    type Grade {
        id: String
        rating: String
    }
    type Query {
        helloFlash: String
        grades: [Grade]
    }
`

const resolvers = {
    Query: {
        helloFlash: () => 'hello flash!',
        grades: () => fetchGrades()
    }
}

module.exports = {
    typeDefs,
    resolvers
}