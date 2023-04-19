import { useState, useEffect } from 'react';
import { io } from "socket.io-client"
import axios from "axios";

let Chat = ( { username }) => {

  const socket = io(import.meta.env.VITE_APP_SERVER);

  let [message, setMessage] = useState("");


  let [messages, setMessages] = useState([
    {username: "Melonhead64", message: "im dumb"},
    {username: "WillyT", message: "im gay"},
    {username: "Mrkornflake", message: "im the best"},
    {username: "XxX_AssAssIn_xXx", message: "Yuuuuh"},
  ])

  socket.on('recieve-message', newMessage => {
    setMessages([...messages, newMessage])
  });

  let sendMessage = (e) => {
    e.preventDefault();
    socket.emit('send-message', {username, message})
  }

  let askAi = (e) => {
    e.preventDefault();
    socket.emit('send-message', {username, message})
    axios.post(`${import.meta.env.VITE_APP_SERVER}/ai`, {role: 'user', content: message})
    .then(res => socket.emit('send-message', {username: 'OpenAi', message: res.data}))
    .catch(err => console.log(err));
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col border-2 w-[400px] h-[500px]">
      {messages.map(m => {
        return <p className="flex justify-center">{m.username}: {m.message}</p>
      })}
      </div>
      <form onSubmit={(e) => sendMessage(e)}>
      <input className="w-[250px] h-[48px] border-2" type="text" placeholder="Send a message!" onChange={(e) => setMessage(e.target.value)}></input>
      <button type="submit" className="btn h-[45px]">Send</button>
      <button type="submit" className="btn h-[45px]" onClick={(e) => askAi(e)}>Ask Ai</button>
      </form>
    </div>
  )
}

export default Chat;