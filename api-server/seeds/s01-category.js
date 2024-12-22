exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    {name: 'Dell'},
    {name: 'HP'},
    {name: 'Apple'},
    {name: 'Microsoft'},
    {name: 'Razer'},
    {name: 'Acer'},
    {name: 'Asus'},
  ]);
};