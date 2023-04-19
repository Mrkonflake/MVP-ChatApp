import {useState} from 'react';

let LoginPage = ({ addUser }) => {

  const [form, setForm] = useState({
    username: "",
  })
  let handleSubmit = (e) => {
    e.preventDefault();
    addUser(form);
  }

  return (
    <div>
      <p className="text-red">this is the login page</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Username" className="border" onChange={(e) => setForm({...form, username: e.target.value})}></input>
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  )
}

export default LoginPage;