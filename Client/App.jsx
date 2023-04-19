import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage.jsx';
import Chat from './components/Chat.jsx';



function App() {
  const [username, setUsername] = useState('');
  const [isLoggedin, setLogin] = useState(false);


useEffect(() => {
  let cachedUser = localStorage.getItem("username");
  if (cachedUser) {
    setUsername(cachedUser)
    setLogin(true);
  }
}, [])

  let addUser = (form) => {
    localStorage.setItem("username", form.username);
    setUsername(form.username);
    setLogin(true);
  }

  return (
    <div className="flex justify-center">
      { isLoggedin ?
      <Chat username={username} />
      : <LoginPage addUser={addUser} />
      }
    </div>
  )
}

export default App
