const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('../graphql/schema')
const { SchemaDirectiveVisitor } = require('graphql-tools')
const { defaultFieldResolver } = require('graphql');

const app = express()

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.applyMiddleware({ app })

const port = process.env.PORT

app.listen(port, _ => {
    console.log(`Climbing API is running on port ${port}${server.graphqlPath}`)
})