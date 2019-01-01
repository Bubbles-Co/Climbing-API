const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
        helloFlash: String
    }
`

const resolvers = {
    Query: {
        helloFlash: () => 'hello flash!'
    }
}

module.exports = {
    typeDefs,
    resolvers
}