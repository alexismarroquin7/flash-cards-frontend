import { useState } from "react";
import { ColorOptions } from "./ColorOptions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Deck } from "../../store";

const style = {
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center'
  },
  textInput: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'flex-start'
  },
  button: {
    marginTop: '.5rem'
  }
}

const initialFormValues = {
  deck_name: '',
  deck_color: '#a9f5e8',
  deck_description: ''
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
    <form className="NewDeckForm" onSubmit={handleSubmit} style={style.root}>
      <h3>New Deck</h3>
      
      <label style={style.textInput}>Name:
        <input 
          name="deck_name"
          type="text"
          value={values.deck_name}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      
      <ColorOptions values={values} setValues={setValues}/>

      <label style={style.textInput}>Description:
        <textarea 
          name="deck_decription"
          type=""
          value={values.deck_description}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>

      <button style={style.button} type="submit">Submit</button>
    </form>
  );
}