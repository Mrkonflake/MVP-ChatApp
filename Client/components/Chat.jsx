import { useState, useEffect } from 'react';
import { io } from "socket.io-client"
import axios from "axios";
import Logout from './Logout.jsx';

let Chat = ( { username, socket, clock }) => {


  let [message, setMessage] = useState("");


  let [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_SERVER}/messages`)
    .then(res => setMessages(res.data))
    .catch(err => console.log('error recieving messages'))
  },[])


  socket.on('recieve-message', newMessage => {
    setMessages([...messages, newMessage])
  });

  let sendMessage = (e) => {
    e.preventDefault();
    socket.emit('send-message', {username, message})
    axios.post(`${import.meta.env.VITE_APP_SERVER}/messages`, {username, message})
  }

  let askAi = (e) => {
    e.preventDefault();
    socket.emit('send-message', {username, message})
    axios.post(`${import.meta.env.VITE_APP_SERVER}/ai`, {role: 'user', content: message})
    .then(res => socket.emit('send-message', {username: 'OpenAi', message: res.data}))
    .catch(err => console.log(err));
    axios.post(`${import.meta.env.VITE_APP_SERVER}/messages`, {username, message})
  }

  return (
    <>
    <div className="flex flex-col justify-center">
      <div>
        {clock}
        <Logout />
      </div>
      <div className="flex flex-col border-2 w-[1000px] h-[800px] overflow-scroll overscroll-contain">
      {messages.map(m => {
        return <p className="flex justify-center">{m.username}: {m.message}</p>
      })}
      </div>
      <form onSubmit={(e) => sendMessage(e)}>
      <input className="w-[500px] h-[48px] border-2" type="text" placeholder="Send a message!" onChange={(e) => setMessage(e.target.value)}></input>
      <button type="submit" className="btn h-[45px]">Send</button>
      <button type="submit" className="btn h-[45px]" onClick={(e) => askAi(e)}>Ask Ai</button>
      </form>
    </div>
      </>
  )
}

export default Chat;