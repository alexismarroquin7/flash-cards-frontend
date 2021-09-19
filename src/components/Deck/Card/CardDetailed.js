import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { Card as CardAction } from "../../../store";
import { PanelSideBySide } from "./PanelSideBySide";

const style = {
  root: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column wrap'
  }
}

export const CardDetailed = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const card = useSelector(s => s.card);
  
  useEffect(() => {
    dispatch(CardAction.fetchById(Number(params.card_id)));
  }, [dispatch, params.card_id]);

  return (
    <div className="CardDetailed" style={style.root}>
      {card.list.length === 1 && (
        <PanelSideBySide panel_a={card.list[0].panel_a} panel_b={card.list[0].panel_b} />
      )}
      
      <div>
        <button 
          onClick={() => {
            const username = localStorage.getItem('username');
            const { deck_id } = params;
            history.push(`/${username}/decks/${deck_id}/cards`);
          }}
        >Back</button>
        
        <button 
          onClick={() => {
            history.push(history.location.pathname + '/edit');
          }}
        >Edit</button>    
      </div>
    
    </div>
  );
}