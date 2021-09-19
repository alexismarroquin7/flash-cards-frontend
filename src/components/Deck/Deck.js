import { useHistory } from "react-router";

export const Deck = ({ deck }) => {
  
  const { deck_id, deck_name, deck_color } = deck;
  const history = useHistory();
  
  return (
  <div className="Deck"
    style={{
      width: '80%',
      backgroundColor: deck_color
    }}
    onClick={() => history.push(`/${localStorage.getItem('username')}/decks/${deck_id}`)}
  >
    <h2>{deck_name}</h2>
  </div>
  )
};