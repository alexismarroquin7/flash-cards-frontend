import { Card as CardAction } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";

const classes = {
  root: {
    
    width: "100vw",
    height: "60vh",
    
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
    
    zIndex: "1",
    position: "absolute",
    
  },
  card: {
    width: "80vw",
    height: "20vw",

    
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "space-between",
    alignItems: "center",
    
    borderRadius: "5px",
    border: "1px solid black",
    background: "white",
    padding: "1rem",
  },
  actionArea: {
    // border: "1px solid black",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    // padding: "1rem",
  }
};

export const DeleteCardModal = ({ setShowDeleteCardModal }) => {
  
  const username = useSelector(s => s.auth.username);

  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const handleDeleteCard = (e) => {
    dispatch(CardAction.deletedById(params.card_id));
    setShowDeleteCardModal();
    history.push(`/${username}/decks/${params.deck_id}/cards`);
  };

  return (
    <div
      style={classes.root}
    >
      <div
        style={classes.card}
      >

      <h3>Delete Card?</h3>

      <div
        style={classes.actionArea}
        >
        <button
          onClick={() => setShowDeleteCardModal()}
          >Cancel</button>
        <button
          onClick={() => handleDeleteCard()}
        >Delete</button>
      </div>
      </div>
    
    </div>
  )
};