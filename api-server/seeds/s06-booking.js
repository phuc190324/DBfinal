exports.seed = async function(knex) {
  // Xóa dữ liệu cũ
  await knex('booking').del();

  // Lấy dữ liệu từ bảng `customer` để làm quan hệ
  const customers = await knex('customer').select('customer_id');

  // Chèn dữ liệu
  await knex('booking').insert([
      {
          customer_id: customers[0].customer_id,
          booking_date: new Date(),
          status: 'Confirmed',
          total_price: 300,
      },
      {
          customer_id: customers[1].customer_id,
          booking_date: new Date(),
          status: 'Pending',
          total_price: 150,
      },
  ]);

  console.log('Seed for bookings completed!');
};
