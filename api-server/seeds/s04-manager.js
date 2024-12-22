exports.seed = async function(knex) {
  await knex('manager').del()
  await knex('manager').insert([
    {username: 'manager01', fullname: 'Trần Quốc Đông', base_salary: 20000000},
    {username: 'manager02', fullname: 'Cao Hữu Bình', base_salary: 35000000},
  ]);
};