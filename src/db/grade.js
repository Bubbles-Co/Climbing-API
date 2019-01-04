const knex = require('knex')

const fetchGrades = () => {
    return knex('grade')
        .select('*')
        .then(console.log)
        .catch(err => {
            console.log('Error while fetching grades: ', err)
            return []
        })
}

module.exports = {
    fetchGrades
}