export const Deck = ({ deck }) => {
  const { deck_name } = deck;
  return (
    <div className="Deck">
      <h2>{deck_name}</h2>
    </div>
  )
};