const style = {
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
  },
  panel: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',

    width: '70vw',
    height: '40vw',
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
const Panel = ({ panel, toggleDisplay }) => {
  return (
    <div className="Panel" style={style.panel} onClick={toggleDisplay}>

    <div style={style.panelItem}>
      <h1>{panel.text}</h1>
    </div>

    {panel.notes && (
      <div style={style.panelItem}>
        <p>notes:</p>
        <p>{panel.notes}</p>
      </div>
    )}
    </div>
  )
}

export const PanelStacked = ({ panel_a, panel_b, display, toggleDisplay }) => {

  return (
  <div className="PanelStacked" style={style.root}>
  
    {display.panel_a && (
      <Panel panel={panel_a} toggleDisplay={toggleDisplay}/>
    )}

    {display.panel_b && (
      <Panel panel={panel_b} toggleDisplay={toggleDisplay} />
    )}
  
  </div>
  );
}