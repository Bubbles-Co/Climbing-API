const R = require('ramda')
const knexConfig = require('../../knexfile')
const knex = require('knex')(knexConfig)

const dynamicParamSelector = info => {
    console.log(info.fieldNodes[0].selectionSet.selections)
    console.log('HHHHH', R.pluck('directives', info.fieldNodes[0].selectionSet.selections))
    return R.pluck('value', R.pluck('name', info.fieldNodes[0].selectionSet.selections))
}

const fetchFromTable = (tableName, info) => {
    return knex
        .select(dynamicParamSelector(info))
        .from(tableName)
        .catch(err => {
            console.log('table: ', tableName);
            console.log('Error while fetching grades: ', err)
            return []
        })
}

module.exports = {
    fetchFromTable
}