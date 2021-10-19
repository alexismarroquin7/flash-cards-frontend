import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Deck as DeckAction } from "../../store";

const style = {
  root: {
    borderRadius: '5px',
    width: '95%',
    marginTop: '.25rem',
    marginBottom: '.25rem',
    padding: '1rem'
  },
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between'
  },
  deleteDeckConfirmation: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: "center"
  }
}

export const Deck = ({ deck }) => {
  
  const { deck_id, deck_name, deck_color, cards } = deck;
  
  const history = useHistory();
  const dispatch = useDispatch();

  const [ display, setDisplay ] = useState({
    deckOptions: false,
    deleteDeckConfirmation: false
  });
  
  const toggleDisplay = (key) => {
    
    setDisplay({
      ...display,
      [key]: !display[key]
    });

  }

  return (
  <div className="Deck"
    style={{
      ...style.root,
      backgroundColor: deck_color
    }}
    onClick={() => history.push(`/${localStorage.getItem('username')}/decks/${deck_id}/cards`)}
  >

    <div style={style.container}>


      <div>
        <div>
          <p>{cards.length} cards</p>
        </div>
        <h3>{deck_name}</h3>
      </div>


      <div>
        <div 
          style={{
            display: "flex",
            flexFlow: "row-reverse wrap"
          }}
        >

        <button
          style={{
            padding: ".25rem"
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleDisplay('deckOptions')
          }}
        >{display.deckOptions ? '<' : 'v'}</button>
        
        {display.deckOptions && (
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              alignItems: "center"
            }}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                dispatch(DeckAction.deleteById(deck_id));
              }}
              >Delete</button>
          </div>
        )}

        </div>
      
      </div>
      
    </div>

  </div>
  )
};