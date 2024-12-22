exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE booking_detail(
            booking_detail_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            booking_id int NOT NULL REFERENCES booking(booking_id) ON DELETE CASCADE,
            room_id int NOT NULL REFERENCES room(room_id) ON DELETE CASCADE,
            quantity int NOT NULL,
            price_per_room int NOT NULL
        );
        COMMENT ON TABLE booking_detail IS 'Chi tiết đặt phòng';
        COMMENT ON COLUMN booking_detail.booking_id IS 'Mã đặt phòng';
        COMMENT ON COLUMN booking_detail.room_id IS 'Mã phòng';
        COMMENT ON COLUMN booking_detail.quantity IS 'Số lượng';
        COMMENT ON COLUMN booking_detail.price_per_room IS 'Giá mỗi phòng';
    `);
};

exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE booking_detail;
    `);
};