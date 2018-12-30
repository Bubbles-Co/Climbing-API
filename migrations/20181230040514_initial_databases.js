exports.up = function(knex, Promise) {
  return knex.schema.createTable('route_type', function(table) {
    table.increments('id');
    table.string('type').unique();
  }).then(() => {
  	return knex.schema.createTable('grade', function(table) {
  		table.increments('id');
  		table.string('rating').unique();
  	})
  }).then(() => {
  	return knex.schema.createTable('finish', function(table) {
  		table.increments('id');
  		table.string('type').unique();
  	})
  }).then(() => {
  	return knex.schema.createTable('gyms', function(table) {
  		table.increments('id');
  		table.string('name').unique();
  		table.string("address");
  		table.string("city");
  		table.string("state");
  		table.string("zip");
  	})
  }).then(() => {
  	return knex.schema.createTable('routes', function(table) {
  		table.increments('id');
  		table.integer('finish').unsigned();
  		table.foreign('finish').references('id').inTable('finish');
  		table.integer('grade').unsigned();
  		table.foreign('grade').references('id').inTable('grade');
  		table.integer('route_type').unsigned();
  		table.foreign('route_type').references('id').inTable('route_type');
  	})
  }).then(() => {
  	return knex.schema.createTable('users', function(table) {
  		table.increments('id');
  		table.string('name');
  		table.string('email').unique();
  		table.string("address");
  		table.string("city");
  		table.string("state");
  		table.string("zip");
  	})
  }).then(() => {
  	return knex.schema.createTable('sessions', function(table) {
  		table.increments('id');
  		table.datetime('date', 6).defaultTo(knex.fn.now(6));
  		table.integer('user_id').unsigned();
  		table.foreign('user_id').references('id').inTable('users');
  		table.integer('gym').unsigned();
  		table.foreign('gym').references('id').inTable('gyms');
  		// This needs to be an array, not sure how
  		table.integer('routes').unsigned();
  		table.foreign('routes').references('id').inTable('routes');
  	})
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('route_type').then(() => {
  	return knex.schema.dropTable('grade').then(() => {
  		return knex.schema.dropTable('finish').then(() => {
  			return knex.schema.dropTable('gyms').then(() => {
  				return knex.schema.dropTable('routes').then(() => {
  					return knex.schema.dropTable('users').then(() => {
  						return knex.schema.dropTable('sessions');
  					})
  				})
  			})
  		})
  	})
  })
}	