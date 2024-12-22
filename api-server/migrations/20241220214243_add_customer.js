exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE customer(
            customer_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            username text NOT NULL UNIQUE,
            password text NOT NULL,
            email text NOT NULL UNIQUE,
            phone_number text,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP
        );
        COMMENT ON TABLE customer IS 'Khách hàng';
        COMMENT ON COLUMN customer.username IS 'Tên đăng nhập';
        COMMENT ON COLUMN customer.password IS 'Mật khẩu';
        COMMENT ON COLUMN customer.email IS 'Email';
        COMMENT ON COLUMN customer.phone_number IS 'Số điện thoại';
        COMMENT ON COLUMN customer.created_at IS 'Thời gian tạo';
    `);
};

exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE customer;
    `);
};