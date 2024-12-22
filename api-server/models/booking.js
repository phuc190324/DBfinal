const { getKnex } = require('./db.js'); // Kết nối với DB qua Knex
const { rowFilter } = require('./security/row.js'); // Áp dụng phân quyền qua rowFilter
const _ = require('lodash'); // Thư viện để xử lý đối tượng

const tableBooking = 'booking';
const tableBookingDetail = 'booking_detail';

// Lấy tất cả các phòng (rooms)
const getAllRooms = async () => {
    let knex = getKnex()(tableBooking).select('*'); // Chọn tất cả các cột từ bảng booking
    knex = rowFilter(knex, 'getAll', tableBooking); // Áp dụng phân quyền nếu cần
    const result = await knex;
    return result;
}

// Lấy thông tin đặt phòng của khách hàng theo customerId
const getBookingByCustomerId = async (customerId) => {
    let knex = getKnex()(tableBooking)
        .select('*')
        .where({ customer_id: customerId }); // Chọn thông tin đặt phòng của khách hàng theo customerId
    knex = rowFilter(knex, 'getAll', tableBooking); // Áp dụng phân quyền nếu cần
    const result = await knex;
    return result;
}

// Thêm chi tiết đặt phòng
const createBookingDetail = async (customerId, roomId, quantity, pricePerRoom) => {
    const newBookingDetail = {
        customer_id: customerId,
        room_id: roomId,
        quantity: quantity,
        price_per_room: pricePerRoom,
    };

    let knex = getKnex()(tableBookingDetail)
        .insert(newBookingDetail); // Thêm thông tin chi tiết đặt phòng
    const result = await knex;
    return result;
}

// Cập nhật chi tiết đặt phòng (nếu cần)
const updateBookingDetail = async (bookingDetailId, patch) => {
    let knex = getKnex()(tableBookingDetail)
        .update(patch)
        .where({ id: bookingDetailId }); // Cập nhật thông tin chi tiết đặt phòng theo bookingDetailId
    const result = await knex;
    return {
        success: result > 0, // Kiểm tra xem có bản ghi nào bị ảnh hưởng
        data: patch,
    };
}

module.exports = {
    getAllRooms,
    getBookingByCustomerId,
    createBookingDetail,
    updateBookingDetail,
};
