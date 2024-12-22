exports.seed = async function(knex) {
  // Xóa dữ liệu cũ trong bảng booking_detail
  await knex('booking_detail').del();

  // Lấy tất cả room_id từ bảng room
  const rooms = await knex('room').select('room_id');

  // Lấy booking_id từ bảng booking
  const bookings = await knex('booking').select('booking_id');

  // Kiểm tra số lượng bản ghi trong bảng booking
  if (bookings.length === 0) {
    console.log("No bookings found. Please add bookings before running this seed.");
    return;
  }

  // Chèn dữ liệu vào bảng booking_detail
  await knex('booking_detail').insert([
    {
      booking_id: bookings[0].booking_id, // booking_id của bản ghi đầu tiên trong bảng booking
      room_id: rooms[0].room_id,           // Lấy room_id từ bảng room
      quantity: 2,
      price_per_room: 100000,
    },
    {
      booking_id: bookings[1].booking_id, // booking_id của bản ghi thứ hai trong bảng booking
      room_id: rooms[1].room_id,
      quantity: 1,
      price_per_room: 200000,
    },
    {
      booking_id: bookings[0].booking_id, // booking_id của bản ghi đầu tiên trong bảng booking
      room_id: rooms[2].room_id,
      quantity: 3,
      price_per_room: 300000,
    },
    {
      booking_id: bookings[1].booking_id, // booking_id của bản ghi thứ hai trong bảng booking
      room_id: rooms[3].room_id,
      quantity: 1,
      price_per_room: 350000,
    },
    {
      booking_id: bookings[0].booking_id, // booking_id của bản ghi đầu tiên trong bảng booking
      room_id: rooms[4].room_id,
      quantity: 2,
      price_per_room: 400000,
    },
  ]);

  console.log('Seed for booking details completed!');
};
