
exports.up = function(knex) {
  return knex.schema.createTable('games', function(table) {
    table.string('id', 50).primary();
    table.string('name').notNullable(); 
    table.string('link', 2048).notNullable();
    
    table.unique(['link']);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('games');
};
