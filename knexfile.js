module.exports = {
    client: 'pg',
    connection: 'postgresql://localhost:5432/flash',
    migrations: {
        tableName: 'knex_migrations'
    },
    seeds: {
        directory: './seeds/dev'
    }
}