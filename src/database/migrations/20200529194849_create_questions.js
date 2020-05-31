
exports.up = function(knex) {
  return knex.schema.createTable('questions', function(table) {
    table.increments().primary();
    table.integer('gameId').unsigned().notNullable(); 
    table.string('text', 1000).notNullable(); 
    table.string('subject').notNullable(); 
    table.enu('difficulty', [1, 2, 3, 4, 5]); 

    table.unique(['gameId', 'text']);
    table.foreign('gameId').references('id').inTable('games').onDelete('CASCADE'); 
  })
};
  
exports.down = function(knex) { 
  return knex.schema.dropTable('questions');
};
