import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Deck as DeckAction } from "../../store";
import { Deck } from "./Deck";

export function Decks(){
  
  const dispatch = useDispatch();
  const deck = useSelector(state => state.deck);
  
  const history = useHistory();
  const handleRedirect = (path) => history.push(path);
  
  useEffect(() => {
    dispatch(
      DeckAction.fetchByUserId(localStorage.getItem('user_id'))
    );
  }, [dispatch]);

  return (
    <div 
      className="Decks"
      style={{
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
      }}
    >
    
    <button onClick={() => handleRedirect(`/${localStorage.getItem('username')}/decks/new`)}>New</button>
    
    {deck.status.loading && (
      <h2>Loading...</h2>
    )}

    {deck.list.length !== 0 &&

      deck.list.map(item => (
        <Deck
          key={item.deck_id} deck={item}
        />
      ))
    }
    
    {deck.status.error.message && <h2>{deck.status.error.message}</h2>}

    </div>
  );
}