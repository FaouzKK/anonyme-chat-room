const express = require('express');
const { createServer } = require('node:http');
const { join, resolve } = require('node:path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;
let connectedUsers = 0;

app.use(express.static('public'));

app.get("/", (req, res) => {

    res.sendFile(join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {

    // console.log(socket.id);
    connectedUsers++;
    console.log(connectedUsers);
    // // console.log("New user join event", username);
    //socket.emit('update-users',{action : "join",count :connectedUsers , username :"you"})
    

    socket.on("ready" ,username => {
        socket.emit('update-users',{action : "join",count :connectedUsers , username :"you"})
        socket.broadcast.emit('update-users', { action: "join", count: connectedUsers, username: username });
    })

    socket.on('message', (msg) => {

        console.log(`Nouveau message emit : ${msg}`);

        console.log(msg);
        socket.broadcast.emit('message', msg);

    })

    socket.on('image-message', imageMsg => {

        console.log(imageMsg) ;
        socket.broadcast.emit('image-message-by-user', imageMsg);
    })

    socket.on('disconnect', evt => {
        connectedUsers--;
        console.log(`Deconnection d'un utiliateur : ${connectedUsers}`);
        socket.broadcast.emit('update-users', { action: "left", count: connectedUsers });
    })

});


server.listen(port, () => {

    console.log(`serveur started at port ${port}`);
})