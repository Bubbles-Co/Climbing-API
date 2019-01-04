const knex = require('knex')({
    client: 'pg',
    connection: 'postgres://flashadmin:FlashAdmin123@localhost:5432/flash',
    migrations: {
        tableName: 'knex_migrations'
    },
    seeds: {
        directory: './seeds/dev'
    }
})

const fetchGrades = () => {
    console.log(knex)
    return knex

        // .select('id')
        // .from('grade')
        .then(console.log)
        .catch(err => {
            console.log('Error while fetching grades: ', err)
            return []
        })
}

module.exports = {
    fetchGrades
}