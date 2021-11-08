//http
const http = require('http');
//express
const express = require('express');
const app = express();
app.use('/', express.static('public'));

const cors = require("cors");


const server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//socket
let io = require('socket.io');
io = new io.Server(server);

//users connect
io.sockets.on('connection', function(socket) {
    console.log("We have a new client: " + socket.id);

    //listen for data from client
    socket.on('mouse', (data) => 
        // console.log("Received: 'data' " + (data)));
        //send  data to all clients
        socket.broadcast.emit('mouse', data));
        // io.sockets.emit('mouse', (data));

    socket.on('handprint', (details) => 
        //send  data to all clients
        socket.broadcast.emit('handprint', details));

    //client disconnects
    socket.on('disconnect', () =>
        console.log("A client has disconnected: " + socket.id));
});

