export const Deck = ({ deck }) => {
  const { deck_name, deck_color } = deck;
  return (
    <div className="Deck"
      style={{
        width: '80%',
        backgroundColor: deck_color
      }}
    >
      <h2>{deck_name}</h2>
    </div>
  )
};