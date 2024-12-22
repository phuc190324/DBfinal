var restify = require('restify');
const { Client } = require('pg');
var server = restify.createServer();
var corsMiddleware = require('restify-cors-middleware2');
var jwt = require('jsonwebtoken');
var format = require('pg-format');
var Router = require('restify-router').Router;
var router = new Router();

const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders:['X-App-Version'],
    exposeHeaders:[]
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser({ mapParams: true })); 
server.use(restify.plugins.queryParser()); 

const root = require('./routes/root');
const login = require('./routes/login');
const room = require('./routes/room');
const manager = require('./routes/manager');
const booking = require('./routes/booking');
const customer = require('./routes/customer');
const service = require('./routes/service');

root.applyRoutes(server);
login.applyRoutes(server);
room.applyRoutes(server);
manager.applyRoutes(server);
booking.applyRoutes(server);
customer.applyRoutes(server);
service.applyRoutes(server)

const PORT = 8080;
server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});