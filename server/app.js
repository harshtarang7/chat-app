import express from 'express'
import { Server } from 'socket.io';
import {createServer} from 'http';
import cors from 'cors';

const port = 3000;

const app = express();
const server = createServer(app);

// created instance of socket io
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        credentials:true,
    }
});

// created circuit
io.on("connection",(socket)=>{
    console.log("user connected");
    console.log("id",socket.id);
    
    socket.emit("welcome","aavo sa")
})

app.use(cors)

server.listen(port,()=>{
    console.log("server is running")
});