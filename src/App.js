import { Route, Switch } from 'react-router';
import {
  Decks, LoginForm, PrivateRoute, 
  Home, NewDeckForm, Cards, CardDetailed,
  NewCardForm, EditCardForm, DeckReview,
  DeckReviewForm, ReviewResults
} from './components';

import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const username = useSelector(s => s.auth.username);
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
          path={`/${username}/decks`} 
          component={Decks}
        />
        
        <PrivateRoute
          exact
          path={`/${username}/decks/new`} 
          component={NewDeckForm}
        />
        
        <PrivateRoute
          exact
          path={`/${username}/decks/:deck_id/cards`}
          component={Cards}
        />
        
        <PrivateRoute
          exact
          path={`/${username}/decks/:deck_id/cards/:card_id`}
          component={CardDetailed}
        />
        
        <PrivateRoute
          exact
          path={`/${username}/decks/:deck_id/new/card`}
          component={NewCardForm}
        />
        
        <PrivateRoute
          exact
          path={`/${username}/decks/:deck_id/cards/:card_id/edit`}
          component={EditCardForm}
        />
        
        <PrivateRoute
          exact
          path={`/${username}/decks/:deck_id/review`}
          component={DeckReview}
        />

        <PrivateRoute
          exact
          path={`/${username}/decks/:deck_id/review-setup`}
          component={DeckReviewForm}
        />
        
        <PrivateRoute
          exact
          path={`/${username}/decks/:deck_id/review-results`}
          component={ReviewResults}
        />

      </Switch>
    
    </div>
  );
}

export default App;
