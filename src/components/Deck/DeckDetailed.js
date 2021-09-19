import { useEffect } from "react";
import { useParams } from "react-router";

const style = {
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center'
  },
  panel: {
    border: '1px solid black',
    width: '60%',
    height: '24rem'
  }
}

export const DeckDetailed = () => {
  const params = useParams();
  
  useEffect(() => {

  });

  console.log(params)

  return (
  <div className="DeckDetailed">

    <div href="#cards" className="Cards" style={style.panel}>
      <h3>#cards</h3>
    </div>
    <div href="#review" className="Review" style={style.panel}>
      <h3>#review</h3>
    </div>
    <div href="#stats" className="Stats" style={style.panel}>
      <h3>#stats</h3>
    </div>
    <div href="#settings" className="Settings" style={style.panel}>
      <h3>#settings</h3>
    </div>
    
  <nav>
    <a href="#cards">cards</a>
    <a href="#review">review</a>
    <a href="#stats">stats</a>
    <a href="#settings">settings</a>
  </nav> 
  
  </div>
  );
}