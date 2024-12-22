exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE booking(
            booking_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            customer_id int NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,
            booking_date timestamp DEFAULT CURRENT_TIMESTAMP,
            status text NOT NULL,
            total_price int DEFAULT 0
        );
        COMMENT ON TABLE booking IS 'Đặt phòng';
        COMMENT ON COLUMN booking.customer_id IS 'Mã khách hàng';
        COMMENT ON COLUMN booking.booking_date IS 'Ngày đặt';
        COMMENT ON COLUMN booking.status IS 'Trạng thái';
        COMMENT ON COLUMN booking.total_price IS 'Tổng giá';
    `);
};

exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE booking;
    `);
};