
exports.up = function(knex) {
  return knex.schema.createTable('games', function(table) {
    table.increments().primary();
    table.string('name').notNullable(); 
    table.string('link', 2048).notNullable();
    
    table.unique(['name', 'link']);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('games');
};
