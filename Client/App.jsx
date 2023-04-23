import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage.jsx';
import Chat from './components/Chat.jsx';

import { useAuth0 } from '@auth0/auth0-react';

function App({socket}) {

  const [username, setUsername] = useState('');
  const [isLoggedin, setLogin] = useState(false);


  const {user, isAuthenticated} = useAuth0();

  useEffect(() => {
    let cachedUser = localStorage.getItem("username");
    if (cachedUser) {
      setUsername(cachedUser)
      setLogin(true);
    }
  }, [])

  let dateFormat = (time) => {
    const dateObj = new Date(time);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}${ampm}`;
    return formattedTime;
  }
  let [clock, setClock] = useState(dateFormat(new Date()));

  socket.on('news_by_server', function(data){
    let result = dateFormat(data.time);
    setClock(result)
  });


  let addUser = (form) => {
    localStorage.setItem("username", form.username);
    setUsername(form.username);
    setLogin(true);
  }
  return (
    <div className="flex justify-center">
      { isAuthenticated ?
      <Chat username={user.given_name ? user.given_name : user.nickname} socket={socket} clock={clock} dateFormat={dateFormat}/>
      : <LoginPage addUser={addUser} />
      }
    </div>
  )
}

export default App
