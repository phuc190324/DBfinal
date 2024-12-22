const { getKnex } = require('./db');  // Kết nối cơ sở dữ liệu
const { rowFilter } = require('./security/row');  // Phân quyền theo hàng

const table = 'customers';  // Tên bảng
const columns = ['id', 'username', 'fullname', 'email', 'phone_number', 'address'];  // Các cột cần lấy

// Lấy tất cả khách hàng
const getAll = async (req) => {
    let knex = getKnex()(table)
        .select(columns);  // Chọn các cột cần thiết
    knex = rowFilter(knex, "getAll", table, req.user);  // Phân quyền theo người dùng
    const result = await knex;  // Thực hiện truy vấn và lấy kết quả
    return result;
};

// Cập nhật thông tin khách hàng
const update = async (context, customerId, patch) => {
    const { role } = context;  // Lấy vai trò của người dùng
    const validPatch = _.pick(patch, columnFilter(table, role, "update"));  // Lọc các trường cần cập nhật

    let knex = getKnex()(table)
        .update(validPatch)  // Cập nhật các trường hợp lệ
        .where({ id: customerId });  // Điều kiện tìm kiếm theo customerId
    knex = rowFilter(knex, "update", table, context);  // Phân quyền theo người dùng
    const rowCount = await knex;  // Thực hiện truy vấn và lấy số dòng bị ảnh hưởng
    return {
        success: rowCount == 1,  // Nếu số dòng ảnh hưởng = 1, tức là cập nhật thành công
        data: validPatch  // Trả lại dữ liệu đã được cập nhật
    };
};

// Xóa khách hàng
const deleteById = async (context, customerId) => {
    let knex = getKnex()(table)
        .del()  // Xóa khách hàng
        .where({ id: customerId });  // Điều kiện tìm kiếm theo customerId
    knex = rowFilter(knex, "delete", table, context);  // Phân quyền theo người dùng
    const rowCount = await knex;  // Thực hiện truy vấn và lấy số dòng bị ảnh hưởng
    return {
        success: rowCount == 1,  // Nếu số dòng ảnh hưởng = 1, tức là xóa thành công
        message: rowCount == 1 ? 'Customer deleted successfully' : 'Customer not found'
    };
};

// Lấy thông tin khách hàng theo customerId
const getById = async (customerId) => {
    let knex = getKnex()(table)
        .select(columns)
        .where({ id: customerId });  // Điều kiện tìm kiếm theo customerId
    const result = await knex.first();  // Lấy kết quả đầu tiên
    return result;  // Trả về thông tin khách hàng
};

module.exports = {
    getAll,
    update,
    deleteById,
    getById
};
