exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE category(  
            category_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name text
        );
        COMMENT ON TABLE category IS 'Loại sản phẩm';
        COMMENT ON COLUMN category.name IS 'Tên loại sản phẩm';
    `);
};

exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE category;
    `);
};