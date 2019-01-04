const { dynamicParamSelector } = require('./util')
const knexConfig = require('../../knexfile')
const knex = require('knex')(knexConfig)

const fetchGrades = (parent, args, context, info) => {
    return knex
        .select(dynamicParamSelector(info))
        .from('grade')
        // .then(console.log)
        .catch(err => {
            console.log('Error while fetching grades: ', err)
            return []
        })
}

module.exports = {
    fetchGrades
}