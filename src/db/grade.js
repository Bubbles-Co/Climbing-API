const { fetchFromTable } = require('./util')
const knexConfig = require('../../knexfile')
const knex = require('knex')(knexConfig)

const fetchGrades = (parent, args, context, info) => {
    return fetchFromTable('grade', info)
}

const fetchRoutes = (parent, args, context, info) => {
    return fetchFromTable('routes', info)
}

module.exports = {
    fetchGrades,
    fetchRoutes
}