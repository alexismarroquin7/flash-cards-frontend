import { useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { Card as CardAction } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "./Card";

const style = {
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '95%',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}

export const Cards = () => {
   
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const card = useSelector(s => s.card);
  const auth = useSelector(s => s.auth);

  const deck = useSelector(
    s => s.deck.list.filter(d => d.deck_id === Number(params.deck_id))[0]
  );
  
  useEffect(() => {
    dispatch(CardAction.fetchByDeckId(params.deck_id));
  }, [dispatch, params.deck_id]);

  return (
  <div className="Cards" style={style.root}>
    
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

        <h2
          style={{
            paddingLeft: ".5rem"
          }}
        >
          / <a style={{color: "black"}} href={`/${auth.username}/decks/${deck.name}/cards`}>
            {deck.deck_name}
            </a>
        </h2>
      </div>
      
      <input 
        placeholder="Filter by text"
      />
    
      <div>
        <button onClick={() => {
          history.push(`/${auth.username}/decks/${params.deck_id}/review-setup`);
        }}>Review</button>

        <button onClick={() => {
          history.push(`/${auth.username}/decks/${params.deck_id}/new/card`);
        }}>New</button>
      </div>
    
    </div>

    
    {
      card.list.length === 0 &&
      card.status.loading === false &&
      !card.status.error.message &&
      <p>No cards have been created for this deck yet.</p>
    }
    
    {card.status.error.message && <p style={{color:'red'}}>{card.status.error.message}</p>}

    {card.list.length !== 0 && card.list.map(cardItem => {
      return <Card key={cardItem.card_id} card={cardItem} /> 
    })}
    
  </div>
  );
}