exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE service(  
            service_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name text,
            price int
        );
        COMMENT ON TABLE service IS 'Dịch vụ';
        COMMENT ON COLUMN service.name IS 'Tên dịch vụ';
        COMMENT ON COLUMN service.price IS 'Giá dịch vụ';
    `);
};

exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE service;
    `);
};