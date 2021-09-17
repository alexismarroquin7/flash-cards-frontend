import { Route, Switch, useHistory } from 'react-router';
import { Decks, LoginForm } from './components';

import './App.css';

function App() {

  const history = useHistory();

  const handleRedirect = (path) => {
    history.push(path)
  }

  return (
    <div className="App">
      
      <button onClick={() => handleRedirect('/login')}>Login</button>
      
      <Switch>
        <Route exact path="/login" component={LoginForm}/>
        <Route exact path="/" component={Decks}/>
      </Switch>
    
    </div>
  );
}

export default App;
