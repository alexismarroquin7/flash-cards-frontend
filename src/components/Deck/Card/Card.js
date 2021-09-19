import { useHistory } from "react-router";

const style = {
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'flex-start',
    border: '1px solid black',
    width: '95%',
    padding: '.5rem'
  }
}

export const Card = ({ card }) => {
  
  const history = useHistory();
  const { card_id, panel_a, panel_b } = card;

  return (
    <div className="Card"
      style={style.root}
      onClick={() => {
        history.push(`${history.location.pathname}/${card_id}`);
      }}
    >
      <p>{panel_a.text}</p>
      <p>{panel_b.text}</p>
    </div>
  );
}