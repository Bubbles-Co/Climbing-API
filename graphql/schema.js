const { gql } = require('apollo-server-express')
const { fetchGrades } = require('../src/db/grade')

const typeDefs = gql`
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
        finish_id: String 
        grade_id: String
        route_type_id: String 
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
    }
`

const resolvers = {
    Query: {
        helloFlash: () => 'hello flash!',
        grades: fetchGrades
    }
}

module.exports = {
    typeDefs,
    resolvers
}