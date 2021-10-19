import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Deck as DeckAction, Auth } from "../../store";
import { Deck } from "./Deck";

const style = {
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center'
  },
  header: {
    width: '95%',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}

export function Decks(){
  
  const dispatch = useDispatch();
  const deck = useSelector(state => state.deck);
  const auth = useSelector(state => state.auth);
  
  const history = useHistory();
  const handleRedirect = (path) => history.push(path);
  
  useEffect(() => {
    dispatch(
      DeckAction.fetchByUserId(auth.user_id)
    );
  }, [dispatch, auth.user_id]);

  

  return (
    <div 
      className="Decks"
      style={style.root}
    >
    <div>
      <button onClick={() => {
        dispatch(Auth.logout());
        setTimeout(() => {
          if(!localStorage.getItem('token')){
            history.push('/login');
          }
        }, 2500);
      
      }}>Logout</button>
    </div>
      
    <div
      style={style.header}
      >
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between"
        }}
        >
        <h2>
          / <a style={{color: "black"}} href={`/${auth.username}/decks`}>
              {auth.username}
            </a>
        </h2>
        
        <h2
          style={{
            paddingLeft: ".5rem"
          }}
        >
          / <a style={{color: "black"}} href={`/${auth.username}/decks`}>
            decks
            </a>
        </h2>
      </div>
      
      
      <button onClick={() => handleRedirect(`/${localStorage.getItem('username')}/decks/new`)}>New</button>
    </div>
    
    {deck.status.loading && (
      <h2>Loading...</h2>
    )}

    {deck.list.length !== 0 &&

      deck.list.map(item => (
        <Deck
          key={item.deck_id} 
          deck={item}
        />
      ))
    }

    {deck.status.error.message && <h2>{deck.status.error.message}</h2>}

    </div>
  );
}