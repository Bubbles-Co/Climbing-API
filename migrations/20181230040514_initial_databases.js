exports.up = function(knex, Promise) {
  return knex.schema.createTable('route_type', function(table) {
    table.uuid('id')
    	.primary()
    	.defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('type').unique();
  }).then(() => {
  	return knex.schema.createTable('grade', function(table) {
  		table.uuid('id')
  			.primary()
  			.defaultTo(knex.raw('uuid_generate_v4()'));
  		table.string('rating').unique();
  	})
  }).then(() => {
  	return knex.schema.createTable('finish', function(table) {
  		table.uuid('id')
  			.primary()
  			.defaultTo(knex.raw('uuid_generate_v4()'));
  		table.string('type').unique();
  	})
  }).then(() => {
  	return knex.schema.createTable('gyms', function(table) {
  		table.uuid('id')
  			.primary()
  			.defaultTo(knex.raw('uuid_generate_v4()'));
  		table.string('name').unique();
  		table.string("address");
  		table.string("city");
  		table.string("state");
  		table.string("zip").unique();
  	})
  }).then(() => {
  	return knex.schema.createTable('routes', function(table) {
  		table.uuid('id')
  			.primary()
  			.defaultTo(knex.raw('uuid_generate_v4()'));
  		table.uuid('finish');
  		table.foreign('finish').references('id').inTable('finish');
  		table.uuid('grade');
  		table.foreign('grade').references('id').inTable('grade');
  		table.uuid('route_type');
  		table.foreign('route_type').references('id').inTable('route_type');
  	})
  }).then(() => {
  	return knex.schema.createTable('users', function(table) {
  		table.uuid('id')
  			.primary()
  			.defaultTo(knex.raw('uuid_generate_v4()'));
  		table.string('name');
  		table.string('email').unique();
  		table.string("address");
  		table.string("city");
  		table.string("state");
  		table.string("zip");
  	})
  }).then(() => {
  	return knex.schema.createTable('sessions', function(table) {
  		table.uuid('id')
  			.primary()
  			.defaultTo(knex.raw('uuid_generate_v4()'));
  		table.datetime('date', 6).defaultTo(knex.fn.now(6));
  		table.uuid('user_id');
  		table.foreign('user_id').references('id').inTable('users');
  		table.uuid('gym');
  		table.foreign('gym').references('id').inTable('gyms');
  	})
  }).then(() => {
  	return knex.schema.createTable('session_routes', function(table) {
  		table.uuid('id')
  			.primary()
  			.defaultTo(knex.raw('uuid_generate_v4()'));
  		table.uuid('route_id');
  		table.foreign('route_id').references('id').inTable('routes');
  		table.uuid('session_id');
  		table.foreign('session_id').references('id').inTable('sessions');
  	})
  })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('sessions')
		.then(() => {
  			return knex.schema.dropTable('users')
	  	})
	  	.then(() => {
	  		return knex.schema.dropTable('routes')
	  	})
	  	.then(() => {
	  		return knex.schema.dropTable('gyms')
	  	})
	  	.then(() => {
	  		return knex.schema.dropTable('grade')
	  	})
	  	.then(() => {
		  	return knex.schema.dropTable('finish')
		})
	  	.then(() => {
		  	return knex.schema.dropTable('session_routes')
		})
	  	.then(() => {
		  	return knex.schema.dropTable('route_type');
	  	})
}	