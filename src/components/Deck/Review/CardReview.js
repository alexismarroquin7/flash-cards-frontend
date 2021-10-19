import { useState } from "react";
import { PanelStacked } from "../Card/PanelStacked";
import { Deck as DeckAction } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

const classes = {
  root: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    padding: "2rem"
  },
  button: {
    padding: "1rem"
  }
}

export const CardReview = ({ card }) => {
  const [display, setDisplay] = useState({
    panel_a: true,
    panel_b: false
  });

  const toggleDisplay = () => setDisplay({
    panel_a: !display.panel_a,
    panel_b: !display.panel_b,
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const queue = useSelector(s => s.deck.review.queue);
  const username = useSelector(s => s.auth.username);

  const handleAnswer = answer => {
    if(queue.length === 1){
      dispatch(DeckAction.reviewCard(answer));
      dispatch(DeckAction.dequeueReviewList());
      history.push(`/${username}/decks/${params.deck_id}/review-results`);
      
    } else {
      dispatch(DeckAction.reviewCard(answer));
      dispatch(DeckAction.dequeueReviewList());

    }
  };
  
  return (
    <div style={classes.root}>
      
      <PanelStacked 
        panel_a={card.panel_a}
        panel_b={card.panel_b}
        display={display}
        toggleDisplay={toggleDisplay}
      />
      
      <div>
        <button
          style={classes.button}
          onClick={() => handleAnswer('INCORRECT')}
        >❌</button>
        <button
          style={classes.button}
          onClick={() => handleAnswer('CORRECT')}
        >✅</button>
      </div>


    </div>
  )
};