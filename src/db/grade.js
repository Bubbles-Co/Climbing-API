const { fetchFromTable } = require('./util')
const knexConfig = require('../../knexfile')
const knex = require('knex')(knexConfig)

const fetchGrades = (parent, args, context, info) => {
    return fetchFromTable('grade', info)
}

const fetchRoutes = (obj, args, context, info) => {
    console.log("parent: ", obj);
    console.log("args: ", args);
    console.log("context: ", context);
    return fetchFromTable('routes', info)
}

module.exports = {
    fetchGrades,
    fetchRoutes
}