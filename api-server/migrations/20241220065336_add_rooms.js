exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE room(  
            room_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name text,
            price int
        );
        COMMENT ON TABLE room IS 'Phòng';
        COMMENT ON COLUMN room.name IS 'Tên phòng';
        COMMENT ON COLUMN room.price IS 'Giá phòng';
    `);
};

exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE room;
    `);
};