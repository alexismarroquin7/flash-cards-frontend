export const ColorOption = ({ color, values, setValues }) => {
  return (
  <div key={color.hex} className="colorOption"
    style={{
      width: color.hex === values.deck_color ? "40px" : "34px",
      height: color.hex === values.deck_color ? "40px" : "34px",
      backgroundColor: color.hex,
      border: color.hex === values.deck_color ? '1px solid black' : ''
    }}
    onClick={() => {
      setValues({
        ...values,
        deck_color: color.hex
      });
    }}
  >
  </div>
  );
}