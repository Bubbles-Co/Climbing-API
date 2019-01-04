const { gql } = require('apollo-server-express')
const { fetchGrades, fetchRoutes } = require('../src/db/grade')

const typeDefs = gql`
    directive @join(
        table: String
    ) on FIELD_DEFINITION
    type Grade {
        id: String
        rating: String
    }
    type Finish {
        id: String
        type: String
    }
    type Gyms {
        id: String
        name: String
        address: String
        city: String
        state: String
        zip: String
    }
    type RouteType {
        id: String
        type: String
    }
    type RouteTypeGrades {
        id: String
        type: String
    }
    type Routes {
        id: String
        finish: [Finish] @join(table: finish)
        grade: [Grade] @join(table: grade)
        routeType: [RouteType] @join(table: route_type)
    }
    type SessionRoutes {
        id: String
        route_id: String
        session_id: String
    }
    type Sessions {
        id: String
        date: String
        user_id: String
        gym_id: String
    }
    type users {
        id: String
        name: String
        email: String
        address: String
        city : String
        state: String
        zip: String
    }
    type Query {
        helloFlash: String
        grades: [Grade]
        routes: [Routes]
    }
`

const resolvers = {
    Query: {
        helloFlash: () => 'hello flash!',
        grades: fetchGrades,
        routes: fetchRoutes
    }
}

module.exports = {
    typeDefs,
    resolvers
}