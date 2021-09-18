import { useState } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "../../../store";
import { useHistory } from "react-router";
const initialCredentials = {
  username: '',
  password: ''
}

export function LoginForm (){

  
  const [credentials, setCredentials] = useState(initialCredentials);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setCredentials({
      ...credentials,
      [name]: value
    });
  }
  
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Auth.login(credentials));
    setCredentials(initialCredentials);
    setTimeout(() => {
      history.push(`/${localStorage.getItem('username')}/decks`)
    }, 2000);
  }

  return (
  <form className="LoginForm" onSubmit={handleSubmit}>
    <input
      name="username"
      value={credentials.username}
      placeholder="username:"
      onChange={handleChange}
      autoComplete="off"
    />
    
    <input
      name="password"
      value={credentials.password}
      placeholder="password:"
      onChange={handleChange}
      autoComplete="off"
    />

    <button type="submit">Login</button>
  </form>
  );
};