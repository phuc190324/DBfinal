const { Client } = require('pg');

class BookingDetail {
    static async getByCustomerId(customerId) {
        const client = new Client();
        await client.connect();
        
        const result = await client.query('SELECT * FROM booking_detail WHERE customer_id = $1', [customerId]);
        await client.end();
        
        return result.rows;
    }

    static async create({ customer_id, room_id, quantity, price_per_room }) {
        const client = new Client();
        await client.connect();
        
        const result = await client.query(
            'INSERT INTO booking_detail (customer_id, room_id, quantity, price_per_room) VALUES ($1, $2, $3, $4) RETURNING *',
            [customer_id, room_id, quantity, price_per_room]
        );
        await client.end();
        
        return result.rows[0];
    }

    static async deleteById(customerId, bookingDetailId) {
        const client = new Client();
        await client.connect();
        
        const result = await client.query('DELETE FROM booking_detail WHERE customer_id = $1 AND booking_detail_id = $2 RETURNING *', [customerId, bookingDetailId]);
        await client.end();
        
        return result.rowCount > 0; // Return true if deleted
    }
}

module.exports = BookingDetail;
