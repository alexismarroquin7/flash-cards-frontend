import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { Deck as DeckAction } from "../../../store";

export const ReviewResults = () => {

  const result = useSelector(s => s.deck.review.result);

  const { correct, incorrect } = result;
  const answerCount = incorrect.length + correct.length;
  const score = ((correct.length / answerCount) * 100).toFixed(2);
  
  const username = useSelector(s => s.auth.username);
  
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  return (
    <div>

      <h4>Correct {correct.length}</h4>
      {correct.map(card => {
        return (
          <div>
            <p>{card.panel_a.text}</p>
          </div>
        )
      })}
      <h4>Incorrect {incorrect.length}</h4>
      {incorrect.map(card => {
        return (
          <div>
            <p>{card.panel_a.text}</p>
          </div>
        )
      })}
      <h4>Score {score}%</h4>
      
      <div>
        <button
          onClick={() => {
            dispatch(DeckAction.clearReviewResults());
            history.push(`/${username}/decks/${params.deck_id}/cards`);
          }}
          >View Card List</button>
        <button
          onClick={() => {
            dispatch(DeckAction.clearReviewResults());
            history.push(`/${username}/decks/${params.deck_id}/review-setup`);
          }}
          >Review Deck</button>
        {incorrect.length > 0 &&
        <button
          onClick={() => {
            history.push(`/${username}/decks/${params.deck_id}/review-setup`);
          }}
        >Review Incorrect Answers</button>}
      </div>
    </div>
  )
}