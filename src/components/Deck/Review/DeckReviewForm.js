import { useState } from "react";
import { useDispatch } from "react-redux";
import { Deck as DeckAction } from "../../../store";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";

const classes = {
  form: {
    border: "1px solid black"
  }
}

export const DeckReviewForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const auth = useSelector(s => s.auth);
  const result = useSelector(s => s.deck.review.result);
  

  const [reviewOption, setReviewOption] = useState({
    order: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(reviewOption.order === ''){
      return;
    }
    dispatch(
      DeckAction.sortCardsForReview(
        Number(params.deck_id),
        reviewOption.order,
        result.incorrect.length > 0 
        ? "INCORRECT"
        : null
      )
    );
    history.push(`/${auth.username}/decks/${params.deck_id}/review`)
  }

  return (
    <form style={classes.form} onSubmit={handleSubmit}>
      <section>
        <h3>Deck Review</h3>
        <label>Order:</label>
        <select
          onChange={(e) => {
            setReviewOption({
              ...reviewOption,
              order: e.target.value
            });
          }}
        >
          <option
            value={''}
          >--select--</option>
          <option
            value={'SHUFFLE'}
          >shuffle</option>
        </select>
      </section>
      
      <div>
        <button onClick={() => {
          history.push(`/${auth.username}/decks/${params.deck_id}/cards`);
        }}>View Card List</button>
        <button type="submit">Review Deck</button>
      </div>

    </form>
  )
}