var Router = require('restify-router').Router;
const router = new Router();
var format = require('pg-format');
var {authenticated} = require('./middleware/authenticate'); 
const { Client } = require('pg');
const {authorized} = require('./middleware/authorize');
const {validated} = require('./middleware/validated')
const Room = require('../models/room')
console.log("Room Module:", Room);

router.get('/room', async (req, res) => {
    const client = new Client({    
        host: `${process.env.POSTGRES_HOST}`,
        port: `${process.env.POSTGRES_PORT}`,
        database: `${process.env.POSTGRES_DB}`,
        user: `${process.env.POSTGRES_USER}`,
        password: `${process.env.POSTGRES_PASSWORD}`,
    })
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

    res.send( {
        rooms: result
    });
});

router.get('/room/:id', [validated], async (req, res) => {
    const id = req.params.id;
    console.log("getById Function:", Room.getById);
    const {found, data} = await Room.getById(id);
    if (found) {
        res.send({
            success: true, code: 200, message: "",
            data: data
        });
    } else {
        res.send({
            success: false, code: 404,
            message: `Cannot find room with id: ${id}`
        });
    }   
});

router.post('/room', [authenticated, authorized, validated], async (req, res) => {
    var {name = "", price = 0} = req.params;
    if (name.length == 0) {
        res.send({
            success: false, code: 403,
            message: "Invalid parameters"
        }); 
    }
    const result = await Room.create({name, price});
    res.send(result); 
});

router.del('/room/:id', [authenticated, authorized, validated], async(req, res) => {
    let id = req.params.id;   
    let result = await Room.deleteById(id); 
    res.send(result);
});

router.patch('/room/:id', [authenticated, authorized, validated], async(req, res) => {
    let {name = "", price=0} = req.params;
    let id = req.params.id;    
    let result = await Room.updateById(id, {name: name, price: price});
    res.send(result); 
});

module.exports = router;