import { useHistory, useParams } from "react-router";

const style = {
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    border: '1px solid black',
    borderRadius: '5px',
    width: '95%',
    padding: '.5rem',
    marginTop: '.5rem',
    marginBottom: '.5rem',
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
      <p>{panel_a.text}</p>
      <p>{panel_b.text}</p> 
    </div>
  );
}