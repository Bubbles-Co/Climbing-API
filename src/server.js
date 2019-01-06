const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('../graphql/schema')
const { SchemaDirectiveVisitor } = require('graphql-tools')
const { defaultFieldResolver } = require('graphql');

const app = express()

class JoinDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field
        field.resolve = async function (...args) {
            const result = await resolve.apply(this, args)
            return result;
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        join: JoinDirective
    }
})

server.applyMiddleware({ app })

const port = process.env.PORT

app.listen(port, _ => {
    console.log(`Climbing API is running on port ${port}${server.graphqlPath}`)
})