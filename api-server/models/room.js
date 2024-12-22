const {getPgClient} = require('./db');
var format = require('pg-format');
const _ = require('lodash');

const all = async () => {
    const client = getPgClient();
    var sql = "select * from room";
    var result = [];

    try {
        await client.connect();
        result = await client.query(sql);    
        result = result.rows
    } catch (e) {
        console.log(e);
    } finally {
        await client.end();
    }
    return result;
}

const byId = async(id) => {
    const client = getPgClient();
    sql = format(
        "select * from room where room_id=%s",
        id
    );

    await client.connect();
    result = await client.query(sql);
    await client.end();

    found = result.rows.length > 0;
    return {
        found: found,
        data: result.rows[0]
    };
}
const deleteById = async (id) => {
    const client = getPgClient();
    const sql = format("DELETE * FROM room WHERE room_id=%s RETURNING *", id);
    let result = [];

    try {
        await client.connect();
        result = await client.query(sql);
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }

    return result.rowCount > 0;
};

const getById = async (id) => {
    const client = getPgClient(); // Kết nối đến DB
    const sql = format("SELECT * FROM room WHERE room_id = %s", id); // Truy vấn SQL
    let result = [];

    try {
        await client.connect(); // Mở kết nối đến database
        result = await client.query(sql); // Thực hiện truy vấn
    } catch (e) {
        console.error("Error in getById:", e.message); // Log lỗi nếu có
        throw e; // Quăng lỗi để xử lý ở nơi gọi hàm
    } finally {
        await client.end(); // Đóng kết nối
    }

    // Kiểm tra kết quả và trả về
    const found = result.rows.length > 0;
    return {
        found: found,           // `true` nếu tìm thấy kết quả, `false` nếu không
        data: found ? result.rows[0] : null, // Dữ liệu của phòng (hoặc `null` nếu không tìm thấy)
    };
};

const updateById = async (id, req) => {
    const info = _.pick(req.params, ['name', 'price']);
    
const rowCount = await getKnex()('room')
        .where('room_id', '=', id)
    .update(info);

const success = rowCount > 0;

if (success) {
    return {
        success: true, message: "Room updated successfully", data: {room: info}
    };
} else {
    return {
        success: false, code: 1, message: `Cannot update room's information. Room with id ${id} does not exist.`,
    }
}
}


module.exports = {
    all, byId, deleteById, getById, updateById
}