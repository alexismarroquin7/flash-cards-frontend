import { useSelector } from "react-redux";
import { CardReview } from "./CardReview";

const classes = {
  root: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center"
  }
}

export const DeckReview = () => {
  const review = useSelector(s => s.deck.review);
  
  return (
    <div
      className="DeckReview"
      style={classes.root}
    >
      {review.queue.length !== 0 && (
        <CardReview card={review.queue[0]} />
      )}
    </div>
  )
}