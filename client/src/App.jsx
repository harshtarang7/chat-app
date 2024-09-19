import { useEffect, useMemo, useState } from 'react';
import {io} from 'socket.io-client'
import {Container, Typography,Button, TextField, Stack} from "@mui/material"

const App = () => {
  const socket = useMemo(()=> io("http://localhost:3000"),[]);

  const [message,setMessage]= useState('')
  const [room,setRoom]= useState('')
  const [socketId,setsocketId]= useState('')
  const [messages,setMessages]= useState([])

  const handleSubmit =(e)=>{
    e.preventDefault();
    socket.emit("message",{message,room});
    setMessage("")
  }

  useEffect(()=>{
    socket.on("connect",()=>{
      setsocketId(socket.id)
      console.log("connected",socket.id)
    })

socket.on("receive-message",(data)=>{
  console.log(data)
  setMessages((messages)=>[...messages,data]);
})

    socket.on("welcome",(s)=>{console.log(s)})
  
    return ()=>{
      socket.disconnect();
    };
  },[]);
  return (
    <Container>
      {/* <Typography variant="h1" component="div" gutterBottom>
        Welcome to socket io
      </Typography> */}
      <Typography variant="h6" component="div" gutterBottom>
        {socketId}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="message"
          variant="outlined"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="room"
          variant="outlined"
          value={room}
          onChange={(e)=>setRoom(e.target.value)}
        />
        <Button type='submit' variant='contained' color='primary'>send</Button>
      </form>

      <Stack>
        {messages.map((m,i)=>(
            <Typography key={i} variant="h6" component="div" gutterBottom>
              {m}
      </Typography>
          ))
        }
      </Stack>
    </Container>
  )
}

export default App
