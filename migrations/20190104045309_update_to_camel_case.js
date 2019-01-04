
exports.up = async function(knex, Promise) {
  await knex.schema.alterTable('route_type_grades', table => {
    table.renameColumn('grade_id', 'gradeId');
    table.renameColumn('route_type_id', 'routeTypeId');
  });
  await knex.schema.renameTable('route_type_grades', 'routeTypeGrades');

  await knex.schema.renameTable('route_type', 'routeTypes');

  await knex.schema.alterTable('routes', table => {
    table.renameColumn('finish_id', 'finishId');
    table.renameColumn('grade_id', 'gradeId');
    table.renameColumn('route_type_id', 'routeTypeId');
  });

  await knex.schema.alterTable('sessions', table => {
    table.renameColumn('user_id', 'userId')
    table.renameColumn('gym_id', 'gymId')
  });

  
  await knex.schema.alterTable('session_routes', table => {
    table.renameColumn('route_id', 'routeId');
    table.renameColumn('session_id', 'sessionId');
  });

  await knex.schema.renameTable('session_routes', 'sessionRoutes');
  await knex.schema.renameTable('grade', 'grades');
};

exports.down = async function(knex, Promise) {
  await knex.schema.renameTable('routeTypeGrades', 'route_type_grades');
  await knex.schema.renameTable('sessionRoutes', 'session_routes');
  await knex.schema.renameTable('routeType', 'route_type');
  await knex.schema.renameTable('grades', 'grade');

  await knex.schema.alterTable('route_type_grades', table => {
    table.renameColumn('gradeId', 'grade_id');
    table.renameColumn('routeTypeId', 'route_type_id');
  });


  await knex.schema.alterTable('routes', table => {
    table.renameColumn('finishId', 'finish_id');
    table.renameColumn('gradeId', 'grade_id');
    table.renameColumn('routeTypeId', 'route_type_id');
  });

  await knex.schema.alterTable('sessions', table => {
    table.renameColumn('userId', 'user_id');
    table.renameColumn('gymId', 'gym_id');
  });

  await knex.schema.alterTable('session_routes', table => {
    table.renameColumn('routeId', 'route_id');
    table.renameColumn('sessionId', 'session_id');
  });
  
};
