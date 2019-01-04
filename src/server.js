const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('../graphql/schema')
const { SchemaDirectiveVisitor } = require('graphql-tools')

const app = express()

class JoinDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field
        field.resolve = async function (...args) {
            const result = await resolve.apply(this, args)
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({ app })

const port = process.env.PORT

app.listen(port, _ => {
    console.log(`Climbing API is running on port ${port}${server.graphqlPath}`)
})