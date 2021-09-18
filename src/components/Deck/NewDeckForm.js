import { useState } from "react";
import { ColorOptions } from "./ColorOptions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Deck } from "../../store";

const initialFormValues = {
  deck_name: '',
  deck_color: '#a9f5e8'
};

export const NewDeckForm = () => {
  const [values, setValues] = useState(initialFormValues);
  
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    })

  };
  
  const handleSubmit = e => {
    e.preventDefault();

    const validName = Boolean(values.deck_name.length > 0)
    const validColor = Boolean(values.deck_color.length > 0)

    if(validName && validColor){
      dispatch(Deck.create(values));
      setTimeout(() => {
        history.push(`/${localStorage.getItem('username')}/decks`)
      }, 3000);
    }
    
  };
  
  return (
    <form className="NewDeckForm" onSubmit={handleSubmit}>
      <input 
        name="deck_name"
        type="text"
        value={values.deck_name}
        onChange={handleChange}
        placeholder="Name:"
        autoComplete="off"
      />

      <ColorOptions values={values} setValues={setValues}/>

      <button type="submit">Submit</button>
    </form>
  );
}