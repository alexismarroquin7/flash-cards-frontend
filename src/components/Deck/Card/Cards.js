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

  useEffect(() => {
    dispatch(CardAction.fetchByDeckId(params.deck_id));
  }, [dispatch, params.deck_id]);

  return (
  <div className="Cards" style={style.root}>
    
    <div
      style={style.header}
    >
    
      <h2>Cards</h2>
      
      <input 
        placeholder="Filter by text"
      />
    
      
      <button onClick={() => {
        history.push(`/${localStorage.getItem('username')}/decks/${params.deck_id}/new/card`);
      }}>New</button>
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

    <div>
      <button onClick={() => {
        const username = localStorage.getItem('username');
        history.push(`/${username}/decks`);
      }}>Back</button>
    </div>
  
  </div>
  );
}