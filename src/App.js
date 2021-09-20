import { Route, Switch } from 'react-router';
import {
  Decks, LoginForm, PrivateRoute, 
  Home, NewDeckForm, Cards, CardDetailed,
  NewCardForm, EditCardForm
} from './components';

import './App.css';

function App() {
  return (
    <div className="App">    
      <Switch>
        <Route exact path="/" component={Home}/>

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
        
        <PrivateRoute
          exact
          path={`/${localStorage.getItem('username')}/decks/:deck_id/cards/:card_id`}
          component={CardDetailed}
        />
        
        <PrivateRoute
          exact
          path={`/${localStorage.getItem('username')}/decks/:deck_id/new/card`}
          component={NewCardForm}
        />
        
        <PrivateRoute
          exact
          path={`/${localStorage.getItem('username')}/decks/:deck_id/cards/:card_id/edit`}
          component={EditCardForm}
        />

      </Switch>
    
    </div>
  );
}

export default App;
