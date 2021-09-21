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
    justifyContent: 'space-between'
  }
}

export const Deck = ({ deck }) => {
  
  const { deck_id, deck_name, deck_color, cards } = deck;
  
  const history = useHistory();
  const dispatch = useDispatch();

  const [ display, setDisplay ] = useState({
    deckOptionsButton: false,
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
    onMouseEnter={() => toggleDisplay('deckOptionsButton')}
    onMouseLeave={() => toggleDisplay('deckOptionsButton')}
    onClick={() => history.push(`/${localStorage.getItem('username')}/decks/${deck_id}/cards`)}
  >

    <div style={style.container}>


      <div>
        <div>
          <p>{cards.length} cards</p>
        </div>
        <h3>{deck_name}</h3>
      </div>


      {display.deckOptionsButton && (
      
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleDisplay('deckOptions')
          }}
        >...</button>

        {display.deckOptions && (
          <div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                dispatch(DeckAction.deleteById(deck_id));
              }}
            >Delete</button>
          </div>
        )}

      </div>
      
      )}
    
    </div>

  </div>
  )
};