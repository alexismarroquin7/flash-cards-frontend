import { useState } from "react";

const initialFormValues = {
  deck_name: '',
  deck_color: ''
};

export const NewDeckForm = () => {
  const [values, setValues] = useState(initialFormValues);

  const handleChange = e => {
    
  };
  
  const handleSubmit = e => {

  };

  return (
    <div className="NewDeckForm" onSubmit={handleSubmit}>
      <input 
        name="name"
        type="text"
        value={values.deck_name}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </div>
  );
}