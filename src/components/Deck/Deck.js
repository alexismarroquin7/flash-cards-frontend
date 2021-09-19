import { useHistory } from "react-router";

const style = {
  root: {
    borderRadius: '5px',
    width: '90%',
    marginTop: '.25rem',
    marginBottom: '.25rem'
  },
  title: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: '.5rem'
  },
  titleHover: {
    opacity: '50%'
  }
}

export const Deck = ({ deck }) => {
  
  const { deck_id, deck_name, deck_color } = deck;
  
  const history = useHistory();
  
  return (
  <div className="Deck"
    style={{
      ...style.root,
      backgroundColor: deck_color
    }}
    onClick={() => history.push(`/${localStorage.getItem('username')}/decks/${deck_id}/cards`)}
  >
    <div style={style.title}>
      <h3>{deck_name}</h3>
    </div>

  </div>
  )
};