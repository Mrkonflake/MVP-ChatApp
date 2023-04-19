import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage.jsx';
import Chat from './components/Chat.jsx';
import { io } from "socket.io-client"

function App() {

  const [username, setUsername] = useState('');
  const [isLoggedin, setLogin] = useState(false);

    const socket = io(import.meta.env.VITE_APP_SERVER);

useEffect(() => {
  let cachedUser = localStorage.getItem("username");
  if (cachedUser) {
    setUsername(cachedUser)
    setLogin(true);
  }
}, [])

socket.on('news_by_server', function(data){
  const dateObj = new Date(data.time);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}${ampm}`;
  console.log(formattedTime);
});

  let addUser = (form) => {
    localStorage.setItem("username", form.username);
    setUsername(form.username);
    setLogin(true);
  }

  return (
    <div className="flex justify-center">
      { isLoggedin ?
      <Chat username={username} socket={socket} />
      : <LoginPage addUser={addUser} />
      }
    </div>
  )
}

export default App
