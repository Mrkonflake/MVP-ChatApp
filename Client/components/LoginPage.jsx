import {useState, useEffect} from 'react';
import {useMsal, useMsalAuthentication} from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

let LoginPage = ({ addUser }) => {
  useMsalAuthentication(InteractionType.Redirect);
  const [form, setForm] = useState({
    username: "",
  })
  // let handleSubmit = (e) => {
  //   e.preventDefault();
  //   addUser(form);
  // }
  function Render() {
    const { accounts } = useMsal();
    try {
      setForm({username: accounts[0].username})
      addUser(form);
    }
    catch (e) {
    }
  }
  return (
      <>
      {Render()}
      <div>Please wait...</div>
      </>
  )
}

// {/* <p className="text-red">this is the login page</p>
// <form onSubmit={(e) => handleSubmit(e)}>
//   <input type="text" placeholder="Username" className="border" onChange={(e) => setForm({...form, username: e.target.value})}></input>
//   <button type="submit" className="btn">Submit</button>
// </form> */}
export default LoginPage;