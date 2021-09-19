import { Route, Switch } from 'react-router';
import { Decks, LoginForm, PrivateRoute, Home, NewDeckForm, Cards } from './components';

import './App.css';

function App() {
  return (
    <div className="App">    
      <Switch>
        <Route 
          exact
          path="/login"
          component={LoginForm}
        />
        
        <PrivateRoute
          exact
          path={`/${localStorage.getItem('username')}/decks`} 
          component={Decks}
        />
        
        <PrivateRoute
          exact
          path={`/${localStorage.getItem('username')}/decks/new`} 
          component={NewDeckForm}
        />
        
        <PrivateRoute
          exact
          path={`/${localStorage.getItem('username')}/decks/:deck_id/cards`}
          component={Cards}
        />

        <Route exact path="/" component={Home}/>
      </Switch>
    
    </div>
  );
}

export default App;
