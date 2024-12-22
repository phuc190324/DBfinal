const Router = require('restify-router').Router;
const router = new Router();
const { authenticated } = require('./middleware/authenticate');
const { authorized } = require('./middleware/authorize');
const { validated } = require('./middleware/validated');
const Booking = require('../models/booking');
const BookingDetail = require('../models/booking_detail');

// Xem danh sách các phòng
router.get('/rooms', [authenticated, authorized], async (req, res) => {
    const rooms = await Booking.getAllRooms();
    res.send({
        success: true,
        code: 200,
        data: rooms
    });
});

// Xem chi tiết đặt phòng của khách hàng (Chỉ cho phép khách hàng xem đặt phòng của chính họ)
router.get('/booking/:customerId', [authenticated, authorized], async (req, res) => {
    const { customerId } = req.params;

    // Chỉ cho phép customer xem thông tin đặt phòng của chính họ
    if (req.user.role === 'customer' && req.user.username !== customerId) {
        return res.send({
            success: false,
            code: 403,
            message: 'You are not authorized to view this booking detail'
        });
    }

    const bookingDetails = await BookingDetail.getByCustomerId(customerId);
    
    if (bookingDetails) {
        res.send({
            success: true,
            code: 200,
            data: bookingDetails
        });
    } else {
        res.send({
            success: false,
            code: 404,
            message: `No booking found for customer with id: ${customerId}`
        });
    }
});

// Thêm chi tiết đặt phòng (Chỉ cho phép khách hàng thực hiện)
router.post('/booking/:customerId', [authenticated, authorized], async (req, res) => {
    const { customerId } = req.params;
    const { room_id, quantity, price_per_room } = req.body;

    if (!room_id || !quantity || !price_per_room) {
        return res.send({
            success: false,
            code: 400,
            message: 'Missing required parameters'
        });
    }

    // Chỉ cho phép khách hàng thêm thông tin đặt phòng cho chính họ
    if (req.user.role === 'customer' && req.user.username !== customerId) {
        return res.send({
            success: false,
            code: 403,
            message: 'You are not authorized to add booking details for this customer'
        });
    }

    const result = await BookingDetail.create({ customer_id: customerId, room_id, quantity, price_per_room });
    
    res.send({
        success: true,
        code: 201,
        message: 'Booking detail added successfully',
        data: result
    });
});

// Xóa chi tiết đặt phòng (Chỉ cho phép khách hàng xóa chi tiết đặt phòng của chính họ)
router.del('/booking/:customerId/:bookingDetailId', [authenticated, authorized], async (req, res) => {
    const { customerId, bookingDetailId } = req.params;

    // Chỉ cho phép khách hàng xóa chi tiết đặt phòng của chính họ
    if (req.user.role === 'customer' && req.user.username !== customerId) {
        return res.send({
            success: false,
            code: 403,
            message: 'You are not authorized to delete this booking detail'
        });
    }

    const result = await BookingDetail.deleteById(customerId, bookingDetailId);
    
    if (result) {
        res.send({
            success: true,
            code: 200,
            message: 'Booking detail deleted successfully'
        });
    } else {
        res.send({
            success: false,
            code: 404,
            message: `No booking detail found with id: ${bookingDetailId}`
        });
    }
});

module.exports = router;
