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
    alignItems: 'flex-start'
  }
}

export const PanelSideBySide = ({ panel_a, panel_b }) => {
  return (
  <div className="Panels" style={style.root}>
  
    <div className="Panel_A" style={style.panel}>
      <p>Panel A</p>

      <div style={style.panelItem}>
        <p>text:</p>
        <p>{panel_a.text}</p>
      </div>

      {panel_a.notes && (
        <div style={style.panelItem}>
          <p>notes:</p>
          <p>{panel_a.notes}</p>
        </div>
      )}
    </div>

    <div className="Panel_B" style={style.panel}>
      <p>Panel B</p>
      
      <div style={style.panelItem}>
        <p>text:</p>
        <p>{panel_b.text}</p>
      </div>

      {panel_b.notes && (
        <div style={style.panelItem}>
          <p>notes:</p>
          <p>{panel_b.notes}</p>
        </div>
      )}
    </div>
  
  </div>
  );
}