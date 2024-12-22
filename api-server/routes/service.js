var Router = require('restify-router').Router;
const router = new Router();
var format = require('pg-format');
var {authenticated} = require('./middleware/authenticate');
const {authorized} = require('./middleware/authorize');
const {validated} = require('./middleware/validated');
const Service = require('../models/service');
console.log("Service Module:", Service);

router.get('/service', async (req, res) => {
    const result = await Service.all();
    res.send({
        services: result
    });
});

router.get('/service/:id', [validated], async (req, res) => {
    const id = req.params.id;
    const {found, data} = await Service.getById(id);
    if (found) {
        res.send({
            success: true, code: 200, message: "",
            data: data
        });
    } else {
        res.send({
            success: false, code: 404,
            message: `Cannot find service with id: ${id}`
        });
    }   
});

router.post('/service', [authenticated, authorized, validated], async (req, res) => {
    const {name = "", description = "", price = 0} = req.body;
    if (name.length === 0) {
        res.send({
            success: false, code: 403,
            message: "Invalid parameters"
        }); 
    } else {
        const result = await Service.create({name, description, price});
        res.send(result);
    }
});

router.del('/service/:id', [authenticated, authorized, validated], async (req, res) => {
    const id = req.params.id;   
    const result = await Service.deleteById(id); 
    res.send(result);
});

router.patch('/service/:id', [authenticated, authorized, validated], async (req, res) => {
    const {name = "", description = "", price = 0} = req.body;
    const id = req.params.id;    
    const result = await Service.updateById(id, {name, description, price});
    res.send(result); 
});

module.exports = router;
