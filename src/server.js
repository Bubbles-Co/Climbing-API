const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('../graphql/schema')

const app = express()

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({ app })

app.get('/', (req, res) => {
    res.send('Hello Flash!')
})

const port = '3000'

app.listen(port, _ => {
    console.log(`Climbing API is running on port ${port}`)
})