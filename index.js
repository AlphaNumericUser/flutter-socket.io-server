
const express = require('express');
const path = require('path');
require('dotenv').config();

//* App de express
const app = express();

//* Servidor Node / Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server)
require('./sockets/socket')

//* PathPublico
const PublicPath = path.resolve( __dirname, 'public' );
app.use( express.static( PublicPath ) );

//* err = error
server.listen(process.env.PORT, (err) => {

    if(err) throw new Error(err);

    console.log('Servidor corriendo en el puerto', process.env.PORT);

});