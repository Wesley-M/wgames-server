
exports.up = function(knex) { 
  return knex.schema.createTable('scores', function(table) {
    table.increments().primary();
    table.integer('gameId').unsigned().notNullable();
    table.string('name').notNullable();
    table.integer('value').notNullable();

    table.foreign('gameId').references('id').inTable('games').onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('scores');
};
