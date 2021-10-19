import { ColorOption } from "./ColorOption";

const colors = [
  {
    name: 'red',
    hex: '#f5a9a9'
  },
  {
    name: 'orange',
    hex: '#f5d3a9'
  },
  {
    name: 'yellow',
    hex: '#f5f1a9'
  },
  {
    name: 'green',
    hex: '#adf5a9'
  },
  {
    name: 'teal',
    hex: '#a9f5e8'
  },
  {
    name: 'blue',
    hex: '#a9def5'
  },
  {
    name: 'violet',
    hex: '#bda9f5'
  },
  {
    name: 'purple',
    hex: '#f5a9e1'
  }
];

const styles = {
  root: {
    width: '95%',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '.5rem',
    paddingBottom: '.5rem'
  },
  colorContainer: {
    width: '75%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '.25rem',
    paddingBottom: '.25rem'
  }
};

export const ColorOptions = ({ values, setValues }) => {
  return (
  <div style={styles.root}>
    
    <label>Color:</label>
    
    <div style={styles.colorContainer}>
      {colors.map(color => (
        <ColorOption key={color.hex} color={color} values={values} setValues={setValues} />
      ))}
    </div>

  </div>

  );
}