exports.seed = async function(knex) {
  // Xóa dữ liệu cũ
  await knex('customer').del();

  // Chèn dữ liệu
  await knex('customer').insert([
      {
          username: 'john_doe',
          password: 'password123',
          email: 'john_doe@example.com',
          phone_number: '1234567890',
      },
      {
          username: 'jane_smith',
          password: 'securepass456',
          email: 'jane_smith@example.com',
          phone_number: '0987654321',
      },
  ]);

  console.log('Seed for customers completed!');
};