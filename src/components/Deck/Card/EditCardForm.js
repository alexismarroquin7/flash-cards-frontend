import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Card as CardAction } from "../../../store";
import { useToggle } from "../../../hooks";
import { DeleteCardModal } from "./DeleteCardModal";

const classes = {
  root: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center"
  },
  panels: {
    width: "90vw",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  panel: {
    width: "50%",
    padding: "1rem",
    display: "flex",
    flexFlow: "column wrap"
  },
  inputContainer: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    margin: "1rem 0"
  },
  actionArea: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    width: "70vw"
  }
}

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
  const [showDeleteCardModal, setShowDeleteCardModal] = useToggle();
  
  const card = useSelector(s => s.card);
  const username = useSelector(s => s.auth.username);
  
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

  const handleCancelSubmit = e => {
    const { deck_id, card_id } = params;
    history.push(`/${username}/decks/${deck_id}/cards/${card_id}`);
    setValues(initialFormValues);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form className="EditCardForm" onSubmit={handleSubmit} style={classes.root}>
        {card.list.length === 1 && (
          <div style={classes.panels}>
          <div
           className="Panel_A"
           style={classes.panel}
          >
            <h3>Panel A</h3>
            
            <div
              style={classes.inputContainer}
            >
              <label
                htmlFor="panel_a.text"
              >text:</label>
              <input
                id="panel_a.text"
                name="panel_a.text"
                value={values.panel_a.text}
                onChange={handleChange}
              />
            </div>

            <div
              style={classes.inputContainer}
            >  
              <label
                htmlFor="panel_a.notes"
              >notes:</label>
              <textarea 
                id="panel_a.notes"
                name="panel_a.notes"
                value={values.panel_a.notes}
                onChange={handleChange}
              />
            </div>
          
          </div>
          
          <div
           className="Panel_B"
           style={classes.panel}
          >
            <h3>Panel B</h3>
            
            <div
              style={classes.inputContainer}
            >
              <label 
                htmlFor="panel_b.text"
              >text:</label>
              <input
                id="panel_b.text"
                name="panel_b.text"
                value={values.panel_b.text} 
                onChange={handleChange}
              />
            </div>

            <div
              style={classes.inputContainer}
            >
              <label
                htmlFor="panel_b.notes"
                >notes:</label>
              <textarea 
                id="panel_b.notes"
                name="panel_b.notes"
                value={values.panel_b.notes}
                onChange={handleChange}
              />
            </div>
          </div>

        </div>
        )}
        <div
          style={classes.actionArea}
        >
          <button onClick={handleCancelSubmit}>Cancel</button>
          <button onClick={() => setShowDeleteCardModal()}>Delete</button>
          <button type="submit">Submit</button>
        </div>
        {showDeleteCardModal && <DeleteCardModal setShowDeleteCardModal={setShowDeleteCardModal}/>}
    </form>
 
  );
}