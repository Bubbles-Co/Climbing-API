
exports.up = function(knex, Promise) {
    return knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public VERSION "1.1";`)
};

exports.down = function(knex, Promise) {
    return knex.raw(`DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;`)  
};
