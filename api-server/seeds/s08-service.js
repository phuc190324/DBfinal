exports.seed = async function(knex) {
  await knex('service').del();
  await knex('service').insert([
    {name: 'Buffet Breakfast', price: 150000},
    {name: 'Car Rental', price: 500000},
    {name: 'Spa and Wellness Center', price: 400000},
    {name: 'Daily Housekeeping', price: 50000},
    {name: 'Airport Shuttle', price: 200000},
  ]);
};