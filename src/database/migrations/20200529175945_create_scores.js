
exports.up = function(knex) { 
  return knex.schema.createTable('scores', function(table) {
    table.increments().primary();
    table.string('gameId').notNullable();
    table.string('name').notNullable();
    table.integer('value').notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

    table.foreign('gameId').references('id').inTable('games').onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('scores');
};
