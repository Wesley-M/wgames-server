
exports.up = function(knex) {
  return knex.schema.createTable('alternatives', function(table) {
    table.increments().primary();
    table.integer('questionId').notNullable(); 
    table.string('text', 500).notNullable();
    table.boolean('isCorrect').defaultTo(false);

    table.unique(['questionId', 'text']);
    table.foreign('questionId').references('id').inTable('questions');
  })
};
  
exports.down = function(knex) {
  return knex.schema.dropTable('alternatives');
};
  