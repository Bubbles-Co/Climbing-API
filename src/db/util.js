const R = require('ramda')

const dynamicParamSelector = info =>
    R.pluck('value', R.pluck('name', info.fieldNodes[0].selectionSet.selections))

module.exports = {
    dynamicParamSelector
}