import { useState } from "react";
import { ColorOptions } from "./ColorOptions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Deck } from "../../store";

const style = {
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center'
  },
  header: {
    width: '95%',
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'flex-start'
  },
  textLabel: {
    width: '95%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    paddingBottom: '.5rem',
    paddingTop: '.5rem',
  },
  textInput: {
    width: '75%'
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
  const [ buttonDisabled, setButtonDisabled ] = useState(false);
  
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector(s => s.auth.username);

  const handleChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    })

  };

  const toggleButtonDisabled = () => setButtonDisabled(!buttonDisabled);
  
  const handleSubmit = e => {
    e.preventDefault();
    toggleButtonDisabled();

    const validName = Boolean(values.deck_name.trim().length > 0)
    const validColor = Boolean(values.deck_color.trim().length > 0)

    if(validName && validColor){
      dispatch(Deck.create({
        deck_name: values.deck_name.trim(),
        deck_color: values.deck_color,
        deck_description: values.deck_description.length !== 0 ? values.deck_description.trim() : null
      }));

      setTimeout(() => {
        history.push(`/${username}/decks`)
      }, 1500);
    }
    
  };

  const handleCancelSubmit = () => {
    setValues(initialFormValues);
    history.push(`/${username}/decks`);
  };
  
  return (
    <form className="NewDeckForm" onSubmit={handleSubmit} style={style.root}>
      <div style={style.header}>
        <h3>New Deck</h3>
      </div>
      
      <label style={style.textLabel}>Name:
        <input 
          style={style.textInput}
          name="deck_name"
          type="text"
          value={values.deck_name}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      
      <ColorOptions values={values} setValues={setValues}/>

      <label style={style.textLabel}>Description:
        <textarea 
          style={style.textInput}
          name="deck_description"
          type=""
          value={values.deck_description}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>

      <div>
        <button style={style.button} onClick={handleCancelSubmit}>Cancel</button>
        <button style={style.button} type="submit" disabled={buttonDisabled}>Submit</button>
      </div>

    </form>
  );
}