
const express = require("express")
const app=express()
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});


io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('message', (message, room) => {
    console.log('Message at server:', message, room);

    if (room.length>0){
      io.to(room).emit('message', message,room);      
    } 
    else {
      io.emit('message', message);
      console.log('Message at server else:', message, room);
    }

  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('joinRoom', (room) => {

    socket.join(room.roomname)
    console.log('Joining room:', room);

  });
});

app.get('/',(req,res)=>{
  res.send("socket server is running")
})

server.listen(8000, () => {
  console.log('Server listening on PORT 8000');
});


