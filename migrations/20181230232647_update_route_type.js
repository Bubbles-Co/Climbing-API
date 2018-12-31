
exports.up = function(knex, Promise) {
	return knex.schema.alterTable('grade', function(table) {
  			table.dropColumn('route_type_id')
  		}).then(() => {
			return knex.schema.createTable('route_type_grades', function(table) {
		 		table.uuid('id')
		 			.primary()
		 			.defaultTo(knex.raw('uuid_generate_v4()'));
		 		table.uuid('grade_id').references('id').inTable('grade');
		 		table.uuid('route_type_id').references('id').inTable('route_type');
		 	})
  		})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('route_type_grades')
		.then(() => {
			return knex.schema.alterTable('route_type', function(table) {
				table.uuid('route_type_id').references('id').inTable('route_type')
			})
		})
};
