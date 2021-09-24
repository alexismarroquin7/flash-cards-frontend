import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Card as CardAction } from "../../../store";

const initialFormValues = {
  card_id: null,
  deck_id: null,
  panel_a: {
    text: '',
    notes: ''
  },
  panel_b: {
    text: '',
    notes: ''
  },
  stack_order: null
}

export const EditCardForm = () => {
  const [values, setValues] = useState(initialFormValues);
  const card = useSelector(s => s.card);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  
  useEffect(() => {
    dispatch(CardAction.fetchById(Number(params.card_id)));
  }, [dispatch, params.card_id]);
  
  useEffect(() => {
    setValues({
      ...card.list[0]
    });
  }, [card.list]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form className="EditCardForm" onSubmit={handleSubmit}>
      {card.list.length === 1 && (
        <div className="Panel_Container" >
        
        <div className="Panel_A" >
          <h3>Panel A</h3>
          
          <label >text:
          <input
            name="panel_a.text"
            value={values.panel_a.text}
            onChange={handleChange}
          /></label>
          
          <label>notes:
          <textarea 
          
            name="panel_a.notes"
            value={values.panel_a.notes}
            onChange={handleChange}
          /></label>
        
        </div>
        
        <div className="Panel_B">
          <h3>Panel B</h3>
          
          <label>text:
          <input 
          
            name="panel_b.text"
            value={values.panel_b.text} 
            onChange={handleChange}
          /></label>

          <label>notes:
          <textarea 
          
            name="panel_b.notes"
            value={values.panel_b.notes}
            onChange={handleChange}
          /></label>

        </div>
      
      </div>
      )}
      <button 
        onClick={() => {
          const username = localStorage.getItem('username');
          const { deck_id, card_id } = params;
          history.push(`/${username}/decks/${deck_id}/cards/${card_id}`);
          setValues(initialFormValues);
        }}
      >cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}