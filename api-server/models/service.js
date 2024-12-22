const { getPgClient } = require('./db');
var format = require('pg-format');
const _ = require('lodash');

const all = async () => {
    const client = getPgClient();
    var sql = "SELECT * FROM service";
    var result = [];

    try {
        await client.connect();
        result = await client.query(sql);
        result = result.rows;
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
    return result;
};

const byId = async (id) => {
    const client = getPgClient();
    const sql = format(
        "SELECT * FROM service WHERE service_id=%s",
        id
    );

    let result;

    try {
        await client.connect();
        result = await client.query(sql);
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.end();
    }

    const found = result.rows.length > 0;
    return {
        found: found,
        data: found ? result.rows[0] : null
    };
};

const deleteById = async (id) => {
    const client = getPgClient();
    const sql = format("DELETE FROM service WHERE service_id=%s RETURNING *", id);
    let result;

    try {
        await client.connect();
        result = await client.query(sql);
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.end();
    }

    return result.rowCount > 0;
};

const getById = async (id) => {
    const client = getPgClient();
    const sql = format("SELECT * FROM service WHERE service_id = %s", id);
    let result;

    try {
        await client.connect();
        result = await client.query(sql);
    } catch (e) {
        console.error("Error in getById:", e.message);
        throw e;
    } finally {
        await client.end();
    }

    const found = result.rows.length > 0;
    return {
        found: found,
        data: found ? result.rows[0] : null
    };
};

const updateById = async (id, req) => {
    const info = _.pick(req.body, ['name', 'description', 'price']);
    const client = getPgClient();
    const sql = format(
        "UPDATE service SET name = %L, description = %L, price = %s WHERE service_id = %s RETURNING *",
        info.name, info.description, info.price, id
    );

    let result;

    try {
        await client.connect();
        result = await client.query(sql);
    } catch (e) {
        console.error("Error in updateById:", e.message);
        throw e;
    } finally {
        await client.end();
    }

    return result.rowCount > 0 ? {
        success: true,
        message: "Service updated successfully",
        data: result.rows[0]
    } : {
        success: false,
        code: 1,
        message: `Cannot update service information. Service with id ${id} does not exist.`
    };
};

module.exports = {
    all, byId, deleteById, getById, updateById
};
