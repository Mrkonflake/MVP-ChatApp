import { useState, useEffect } from 'react';
import { io } from "socket.io-client"
import axios from "axios";
// import Logout from './Logout.jsx';
import Message from './Message.jsx';

let Chat = ( { username, socket, clock, dateFormat }) => {


  let [message, setMessage] = useState("");


  let [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get(`/api/messages`)
    .then(res => setMessages(res.data))
    .catch(err => console.log('error recieving messages'))
  },[])


  socket.on('recieve-message', newMessage => {
    setMessages([...messages, newMessage])
  });

  let sendMessage = (e) => {
    e.preventDefault();

    socket.emit('send-message', {username, message})
    axios.post(`/api/messages`, {username, message})
  }

  let askAi = (e) => {
    e.preventDefault();
    socket.emit('send-message', {username, message})
    axios.post(`/api/ai`, {role: 'user', content: message})
    .then(res => socket.emit('send-message', {username: 'OpenAi🤖', message: res.data}))
    .catch(err => console.log(err));
    axios.post(`/api/messages`, {username, message})
  }

  return (
    <>
    <div className="flex flex-col justify-center w-[80%] ">
      <div className="flex justify-between bg-neutral-300">
        <h2 className="text-lg">{clock}</h2>
        <h2 className='text-xl'>Welcome to AI Group Chat</h2>
        {/* <Logout /> */}
      </div>
      <div className="flex flex-col border-2  h-[600px] overflow-scroll overscroll-contain">
      {messages.map((m, i) => {
        return <Message m={m} key={i} dateFormat={dateFormat}/>
      })}
      </div>
      <form onSubmit={(e) => sendMessage(e)}>
      <input className="w-[80%] h-[48px] border-2 border-black rounded-lg" type="text" placeholder="Send a message!" onChange={(e) => setMessage(e.target.value)}></input>
      <button type="submit" className="btn h-[45px] w-[10%] btn-outline btn-primary">Send</button>
      <button type="submit" className="btn h-[45px] w-[10%] btn-outline btn-primary" onClick={(e) => askAi(e)}>Ask Ai</button>
      </form>
    </div>
      </>
  )
}

export default Chat;