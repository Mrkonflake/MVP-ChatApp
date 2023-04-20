import {useState, useEffect} from 'react';


import { useAuth0 } from '@auth0/auth0-react';

let LoginPage = ({ addUser }) => {


  const {loginWithRedirect, isAuthenticated} = useAuth0();

  const [form, setForm] = useState({
    username: "",
  })


  return (
    !isAuthenticated && (
      <button className="btn" onClick={() => loginWithRedirect()}>
        Sign In
    </button>
      )
  )
}
// let handleSubmit = (e) => {
//   e.preventDefault();
//   addUser(form);
// }

// {/* <p className="text-red">this is the login page</p>
// <form onSubmit={(e) => handleSubmit(e)}>
//   <input type="text" placeholder="Username" className="border" onChange={(e) => setForm({...form, username: e.target.value})}></input>
//   <button type="submit" className="btn">Submit</button>
// </form> */}
export default LoginPage;