const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('../graphql/schema')
const { SchemaDirectiveVisitor } = require('graphql-tools')
const { defaultFieldResolver } = require('graphql');

const app = express()

// Create (or import) a custom schema directive
class UpperCaseDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
      const { resolve = defaultFieldResolver } = field;
      const { flag } = this.args;
      console.log("Argument passed to directive: ", flag);
      field.resolve = async function (...args) {
        const result = await resolve.apply(this, args);
        if (typeof result === 'string') {
          return result.toUpperCase();
        }
        return result;
      };
    }
  }

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        upper: UpperCaseDirective
    }
})



server.applyMiddleware({ app })

const port = process.env.PORT

app.listen(port, _ => {
    console.log(`Climbing API is running on port ${port}${server.graphqlPath}`)
})