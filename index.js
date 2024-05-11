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

       //console.log('hi') ; 
       res.sendFile(join(__dirname , 'index.html')) ;
  }) ;


  io.on('connection', (socket) => {
       
      // console.log('Un nouvelle utilisateur viens de se connecter') ;


        // console.log('Un utilisateur viens de se connecter') ;
        // socket.emit("userjoined") ;
        // socket.broadcast.emit("userjoined") ;
    
        socket.on('message', (msg)=> {     
            
            console.log(`Nouveau message emit : ${msg}`) ;
            
            console.log(msg) ;
            socket.broadcast.emit('message', msg) ;
             
        })

        // socket.on('disconnect', ()=> {

        //         //console.log(raison) ;
        //         socket.emit('userLeft') ;
        //         socket.broadcast.emit("userLeft") ;
               
        // })
  }) ;

//   io.on('disconnect', ()=> {

//         console.log('Un utilisateur viens de se deconnecter') ;
//   })

   
  server.listen(port, () => {
    
      console.log('serveur started') ;
  })