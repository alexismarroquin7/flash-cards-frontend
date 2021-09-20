const style = {
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
  },
  panel: {
    width: '45vw',
    padding: '.5rem',
    border: '1px solid black'
  },
  panelItem: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export const PanelStacked = ({ panel_a, panel_b, display, toggleDisplay }) => {

  return (
  <div className="PanelStacked" style={style.root}>
  
    {display.panel_a && (
      <div className="Panel_A" style={style.panel} onClick={toggleDisplay}>

        <div style={style.panelItem}>
          <h3>{panel_a.text}</h3>
        </div>

        {panel_a.notes && (
          <div style={style.panelItem}>
            <p>notes:</p>
            <p>{panel_a.notes}</p>
          </div>
        )}
      </div>
    )}

    {display.panel_b && (
      <div className="Panel_B" style={style.panel} onClick={toggleDisplay}>
        
        <div style={style.panelItem}>
          <h3>{panel_b.text}</h3>
        </div>

        {panel_b.notes && (
          <div style={style.panelItem}>
            <p>notes:</p>
            <p>{panel_b.notes}</p>
          </div>
        )}
      </div>
    )}
  
  </div>
  );
}