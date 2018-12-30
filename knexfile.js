module.exports = {
    client: 'pg',
    connection: 'postgres://flashadmin:FlashAdmin123@localhost:5432/flash',
    migrations: {
        tableName: 'knex_migrations'
    },
    seeds: {
        directory: './seeds/dev'
    }
}