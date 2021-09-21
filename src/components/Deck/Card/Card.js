import { useHistory, useParams } from "react-router";

const style = {
  root: {
    width: '95%',
    height: '8rem',
    display: 'flex',
    flexFlow: 'row wrap',
    
    border: '1px solid black',
    borderRadius: '5px',
    
    paddingLeft: '.5rem',
    marginTop: '.5rem',
    marginBottom: '.5rem',
  },

  textContainer: {
    display: 'flex',
    width: '50%',
    
    flexFlow: 'row wrap'
  },

  textElement: {
    width: '100%'
  }
}

export const Card = ({ card }) => {
  
  const history = useHistory();
  const params = useParams();
  const { card_id, panel_a, panel_b } = card;

  return (
    <div className="Card"
      style={style.root}
      onClick={() => {
        history.push(`/${localStorage.getItem('username')}/decks/${params.deck_id}/cards/${card_id}`);
      }}
    > 
      <div style={style.textContainer}>
        <h4 style={style.textElement}>{panel_a.text}</h4>
        <p style={style.textElement}>{panel_b.text}</p> 
      </div>
      
    </div>
  );
}