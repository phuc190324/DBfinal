const Router = require('restify-router').Router;
const router = new Router();
const { authenticated } = require('./middleware/authenticate');
const { authorized } = require('./middleware/authorize');
const { validated } = require('./middleware/validated');
const Customer = require('../models/customer');

// Xem thông tin khách hàng (Chỉ cho phép khách hàng xem thông tin của chính mình, admin hoặc manager có thể xem tất cả)
router.get('/customer/:customerId', [authenticated, authorized], async (req, res) => {
    const { customerId } = req.params;

    // Nếu là customer, chỉ được phép xem thông tin của chính mình
    if (req.user.role === 'customer' && req.user.username !== customerId) {
        return res.send({
            success: false,
            code: 403,
            message: 'You are not authorized to view this customer information'
        });
    }

    const customerInfo = await Customer.getById(customerId);
    
    if (customerInfo) {
        res.send({
            success: true,
            code: 200,
            data: customerInfo
        });
    } else {
        res.send({
            success: false,
            code: 404,
            message: `No customer found with id: ${customerId}`
        });
    }
});

// Cập nhật thông tin khách hàng (Chỉ cho phép khách hàng cập nhật thông tin của chính mình, admin hoặc manager có thể cập nhật tất cả)
router.patch('/customer/:customerId', [authenticated, authorized, validated], async (req, res) => {
    const { customerId } = req.params;
    const { fullname, email, phone } = req.body;

    // Kiểm tra nếu người dùng không phải là admin hoặc manager và không phải là customer của chính họ
    if (req.user.role === 'customer' && req.user.username !== customerId) {
        return res.send({
            success: false,
            code: 403,
            message: 'You are not authorized to update this customer information'
        });
    }

    const updatedCustomer = await Customer.update(customerId, { fullname, email, phone });
    
    if (updatedCustomer) {
        res.send({
            success: true,
            code: 200,
            message: 'Customer information updated successfully',
            data: updatedCustomer
        });
    } else {
        res.send({
            success: false,
            code: 404,
            message: `No customer found with id: ${customerId}`
        });
    }
});

// Xóa thông tin khách hàng (Chỉ admin có quyền xóa thông tin khách hàng)
router.del('/customer/:customerId', [authenticated, authorized], async (req, res) => {
    const { customerId } = req.params;

    // Chỉ admin mới có thể xóa khách hàng
    if (req.user.role !== 'admin') {
        return res.send({
            success: false,
            code: 403,
            message: 'You are not authorized to delete this customer'
        });
    }

    const result = await Customer.deleteById(customerId);
    
    if (result) {
        res.send({
            success: true,
            code: 200,
            message: 'Customer deleted successfully'
        });
    } else {
        res.send({
            success: false,
            code: 404,
            message: `No customer found with id: ${customerId}`
        });
    }
});

module.exports = router;
