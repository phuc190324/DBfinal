exports.seed = async function(knex) {
  await knex('room').del()
  await knex('room').insert([
    {name: 'Economic double room', price: 100000},
    {name: 'King room with garden view', price: 200000},
    {name: '4-bed mixed dormitory room', price: 300000},
    {name: 'Quadruple room with garden view', price: 350000},
    {name: 'Economic triple room', price: 400000}
  ]);
};
