//react
import { useState, useEffect } from "react";

//store
import { useDispatch, useSelector } from "react-redux";
import { Card as CardAction } from "../../../store";

//router
import { useParams, useHistory } from "react-router";

//components
import { PanelStacked } from "./PanelStacked";

const style = {
  root: {
    width: '100%',
    padding: '1rem',
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    width: '40%',
    marginTop: '5rem',
    padding: '1rem',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'space-between'
  }
}

export const CardDetailed = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const card = useSelector(s => s.card);
  
  useEffect(() => {
    dispatch(
      CardAction.fetchById(Number(params.card_id))
    );
  
  }, [ dispatch, params.card_id ]);

  const [ display, setDisplay ] = useState({
    panel_a: true, panel_b: false 
  });

  const toggleDisplay = () => {
    setDisplay({ 
      panel_a: !display.panel_a,
      panel_b: !display.panel_b
    });
  }

  return (
    <div className="CardDetailed" style={style.root}>

      
      {card.list.length === 1 && (
        <PanelStacked 
          panel_a={card.list[0].panel_a} 
          panel_b={card.list[0].panel_b} 
          display={display}
          toggleDisplay={toggleDisplay}
        />
      )}
      
      <div
        style={style.buttonContainer}
      >
        <button 
          onClick={() => {
            const username = localStorage.getItem('username');
            const { deck_id } = params;
            history.push(`/${username}/decks/${deck_id}/cards`);
          }}
        >Back</button>
      
        <button
          onClick={toggleDisplay}
        >Flip</button>
      
        <button 
          onClick={() => {
            history.push(history.location.pathname + '/edit');
          }}
        >Edit</button>
      </div>
    
    </div>
  );
}