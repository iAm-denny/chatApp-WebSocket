const express = require("express");
const socket = require("socket.io");
const { addUser, getUser, getUserInRoom } = require('./Users')

const app = express();

var server = app.listen(4000, () => console.log("Listening on port 4000"));

const io = socket(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("Made a connection");

  socket.on("join", (data, callback) => {
      const { name, room } = data
      const {error, user } = addUser({id: socket.id, name, room}) 
      if(error) return callback(error)  
      socket.broadcast.to(user.room).emit("welcome", { message: `${user.name} has joined!` })
      socket.join(user.room)
      socket.emit("join", { user})

      const users = getUserInRoom(user.room)
      socket.emit("getUsersInRoom", users)
    });  

  socket.on("sendMessage", (message) => {
      const  user  = getUser(socket.id)
      io.to(user.room).emit("getMessages", {user:user.name, message})
  })

});
