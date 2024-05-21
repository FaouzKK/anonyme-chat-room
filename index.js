const express = require('express');
const { Socket } = require('node:dgram');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');


  const app = express(); 
  const server = createServer(app);
  const io = new Server(server);
  const port = process.env.PORT || 3000;
 
  app.use(express.static('public'));

  app.get("/", (req ,res)=> {

       res.sendFile(join(__dirname , 'index.html')) ;
  }) ;


  io.on('connection', (socket) => {
       
    
        socket.on('message', (msg)=> {     
            
            console.log(`Nouveau message emit : ${msg}`) ;
            
            console.log(msg) ;
            socket.broadcast.emit('message', msg) ;
                       
        })
      
  }) ;

   
  server.listen(port, () => {
    
      console.log(`serveur started at port ${port}`) ;
  })