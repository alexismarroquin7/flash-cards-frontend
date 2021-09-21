import { useState } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "../../../store";
import { useHistory } from "react-router";

const style = {
  root: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center'
  },
  container: {
    width: '40%',
    display: 'flex',
    flexFlow: 'column wrap'
  }
}

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
  <form className="LoginForm" onSubmit={handleSubmit} style={style.root}>
    <div style={style.container}>
      <h2>Login</h2>
      
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

      <div>
        <button type="submit">Login</button>
      </div>

    </div>
  </form>
  );
};