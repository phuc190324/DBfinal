exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE manager(  
            username text NOT NULL PRIMARY KEY,
            fullname text,
            base_salary int
        );
        COMMENT ON TABLE manager IS 'Quản lí';
        COMMENT ON COLUMN manager.username IS 'Tên phòng';
        COMMENT ON COLUMN manager.fullname IS 'Tên đầy đủ';
        COMMENT ON COLUMN manager.base_salary IS 'Lương tháng';
    `);
};

exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE manager;
    `);
};