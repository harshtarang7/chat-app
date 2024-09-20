import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import * as env from "dotenv";

env.config();

const port = 3000;
const app = express();
const server = createServer(app);

// created instance of socket io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


const secretJWTKey = process.env.JWT_SECRET;

app.get("/login", (req, res) => {
  const token = jwt.sign({ _id: "sasasasasasas" }, secretJWTKey);
  res
    .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    .json({
      message: "login success",
    });
});

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, (err) => {
    if (err) return next(err);

    const token = socket.request.cookies.token;

    if (!token) return next(new Error("Authentication Error"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  });
});

// created circuit
io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("message", ({ room, message }) => {
    console.log({ room, message });
    socket.to(room).emit("receive-message", message);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});




server.listen(port, () => {
  console.log("server is running");
});
