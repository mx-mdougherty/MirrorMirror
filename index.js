//express
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//http
let http = require('http');
let server = http.createServer(app);
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
    socket.on('data', function(data) {
        console.log("Received: 'data' " + data);

        //send  data to all clients, including this one
        io.sockets.emit('data', data);
    });

    //client disconnects
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });
});
