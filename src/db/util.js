const R = require('ramda')
const knexConfig = require('../../knexfile')
const knex = require('knex')(knexConfig)

const dynamicParamSelector = info => {
    return R.pluck('value', R.pluck('name', info.fieldNodes[0].selectionSet.selections))
}

const fetchFromTable = (tableName, info) => {
    return knex
        .select(dynamicParamSelector(info))
        .from(tableName)
        .catch(err => {
            console.log('Error while fetching from ' + tableName, err)
            return []
        })
}

const fetch = (parent, args, context, info) => {
    const { fieldName } = info
    console.log("selections: ", info.fieldNodes[0].selectionSet.selections);
    return fetchFromTable(fieldName, info)
}

module.exports = {
    fetch
}