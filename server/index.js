const express = require("express");
const app = express();

const { Server } = require("socket.io");
const { createServer } = require("http");

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log("Backend....", socket.id);

  socket.on("room:join", (data) => {
    console.log("inside backend");
    const { email, room } = data;
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { ans });
  });
});

server.listen(5000, () => {
  console.log("server is listning on port 5000");
});
