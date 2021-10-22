import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Card as CardAction } from "../../../store";
import { useToggle } from "../../../hooks";

const style = {
  root: {
    // border: '1px solid red',
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    padding: '.5rem',
  },
  panelContainer: {
    // border: '1px solid green',
    padding: '.5rem',
    width: '95%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around'
  },
  panel: {
    // border: '1px solid blue',
    textAlign: 'left',
    display: 'flex',
    flexFlow: 'column wrap'
  },
  textInputLabel: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-start'
  },
  textInput: {
    width: '100%'
  }
}

const initialFormValues = {
  deck_id: null,
  panel_a: {
    text: '',
    notes: ''
  },
  panel_b: {
    text: '',
    notes: ''
  }
}

export const NewCardForm = () => {
  const [values, setValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useToggle(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    switch(name){
      case 'panel_a.text':
        
        return setValues({
          ...values,
          panel_a: {
            ...values.panel_a,
            text: value
          }
        });
      case 'panel_a.notes':
        return setValues({
          ...values,
          panel_a: {
            ...values.panel_a,
            notes: value
          }
        });
      case 'panel_b.text':
        return setValues({
          ...values,
          panel_b: {
            ...values.panel_b,
            text: value
          }
        });
      case 'panel_b.notes':
        return setValues({
          ...values,
          panel_b: {
            ...values.panel_b,
            notes: value
          }
        });
      default:
        return setValues({
        ...values,
        [name]: value
      });
    }
  }
  
  
  useEffect(() => {
    setValues(v => {
      return {
        ...v,
        deck_id: params.deck_id
      }
    });
    
  }, [params.deck_id]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled();
    
    const valid = {
      panel_a: {
        text: Boolean(values.panel_a.text.trim().length !== 0)
      }
    };

    if(valid.panel_a.text){
      dispatch(
        CardAction.create(values)
      );
    
      setTimeout(() => {
        history.push(
          `/${localStorage.getItem('username')}/decks/${params.deck_id}/cards`
        );
      }, 2000);
    }
  }

  return (
    <form className="NewCardForm" style={style.root} onSubmit={handleSubmit}>
      <div className="Panel_Container" style={style.panelContainer}>
        
        <div className="Panel_A" style={style.panel}>
          <h3>Panel A</h3>
          
          <label style={style.textInputLabel}>text:
          <input 
            style={style.textInput}
            name="panel_a.text"
            value={values.panel_a.text}
            onChange={handleChange}
          /></label>
          
          <label style={style.textInputLabel}>notes:
          <textarea 
            style={style.textInput}
            name="panel_a.notes"
            value={values.panel_a.notes}
            onChange={handleChange}
          /></label>
        
        </div>
        
        <div className="Panel_B" style={style.panel}>
          <h3>Panel B</h3>
          
          <label style={style.textInputLabel}>text:
          <input 
            style={style.textInput}
            name="panel_b.text"
            value={values.panel_b.text} 
            onChange={handleChange}
          /></label>

          <label style={style.textInputLabel}>notes:
          <textarea 
            style={style.textInput}
            name="panel_b.notes"
            value={values.panel_b.notes}
            onChange={handleChange}
          /></label>

        </div>
      
      </div>

      <div>
        <button 
          onClick={() => {
            const username = localStorage.getItem('username');
            const { deck_id } = params;
            history.push(`/${username}/decks/${deck_id}/cards`);
            setValues(initialFormValues);
          }}
        >Cancel</button>
        <button 
          type="submit"
          disabled={disabled}
        >Submit</button>
      </div>

    </form>
  );
}