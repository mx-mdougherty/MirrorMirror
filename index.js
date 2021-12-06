// NEXT STEPS
// add intro on mirror/ figure in back
// click on knobs > sound of turning and dripping water (fades out) - not sent to other users
// make secondary mirror that does not allow you to see a new secret

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

// misc
const cors = require("cors");

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

    socket.on('handprint', (details) => 
        socket.broadcast.emit('handprint', details));

    socket.on('heart', (specs) =>
        socket.broadcast.emit('heart', specs));

    //client disconnects
    socket.on('disconnect', () =>
        console.log("A client has disconnected: " + socket.id));
});


// For Chamber of Secrets
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use("/",express.static("of"));

// Db initial code
let Datastore = require("nedb");
let db= new Datastore("secret.db");
db.loadDatabase();

let secretKeeper = [];

// route listening for POST req
app.post("/Secrets",(req,res)=>{
    console.log(req.body);
    let obj ={
        secret: req.body.text,
        font: req.body.font,
        bubble: req.body.bubble,
    }
    // insert data into database
    db.insert(obj,(err, newDocs)=>{
        if(err){
            res.json({task: "task failed"});
        }
        else{
            res.json({task:"success"});
        }
    })
})

// route for secrets
app.get ("/Secrets",(req,res)=>{
    db.find({}, (err,docs)=>{
        if(err){
            res.json({task:"Task failed"});
        } else{
            let obj = {data,docs};
            res.json(obj);
        }
    })
}) 
