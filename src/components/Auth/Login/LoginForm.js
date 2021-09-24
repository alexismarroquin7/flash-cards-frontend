import { useState } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "../../../store";
import { useHistory } from "react-router";

import "./LoginForm.css";

// const style = {
//   root: {
//     width: '100%',
//     display: 'flex',
//     flexFlow: 'column wrap',
//     alignItems: 'center'
//   },
//   container: {
//     width: '40%',
//     display: 'flex',
//     flexFlow: 'column wrap'
//   }
// }

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
      if(localStorage.getItem('username')){
        history.push(`/${localStorage.getItem('username')}/decks`)
      }
    }, 2000);
  }

  return (
  <form className="LoginForm" onSubmit={handleSubmit}>
    <div className="LoginForm__container">
      
      <div>
        <h2>Login</h2>
      </div>
      
      <label>Username:
      <input
        name="username"
        value={credentials.username}
        onChange={handleChange}
        autoComplete="off"
      /></label>
      
      <label>Password:
      <input
        name="password"
        value={credentials.password}
        onChange={handleChange}
        autoComplete="off"
      /></label>

      <div className="LoginForm__container__buttonContainer">
        <button type="submit">Login</button>
      </div>

    </div>
  </form>
  );
};