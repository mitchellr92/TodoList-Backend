exports.up = function(knex) {
  return knex.schema.createTable("checkList", table => {
    table.increments();
    table.string("title").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("checkList");
};
