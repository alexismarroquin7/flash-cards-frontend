import { useState } from "react";
import { useHistory } from "react-router";

const classes = {
  root: {
    padding: "2rem"
  },
  header: {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  panel: {
    border: "1px solid black",
    borderRadius: "10px",
    
    width: "100%",
    
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    
    padding: "2rem"
  },
  content: {
    
    display: "flex",
    flexFlow: "column wrap",

    padding: "2rem"
  }
}

export const Home = () => {
  const history = useHistory();
  const [state] = useState({
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur gravida arcu ac tortor dignissim. Facilisis gravida neque convallis a. Ut tellus elementum sagittis vitae et leo duis. Turpis nunc eget lorem dolor sed. Est velit egestas dui id ornare arcu odio ut sem. Id nibh tortor id aliquet lectus proin. Sit amet purus gravida quis blandit turpis cursus in. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Sagittis orci a scelerisque purus. Sit amet nisl suscipit adipiscing bibendum est ultricies. Hendrerit gravida rutrum quisque non tellus orci.`,
    deck: {
      features: [
        {
          feature_id: 1,
          text: "review card list"
        },
        {
          feature_id: 2,
          text: "view card count"
        }
      ]
    },
    card: {
      features: [
        {
          feature_id: 1,
          text: "create"
        },
        {
          feature_id: 2,
          text: "view"
        }
      ]
    }
  });

  const handleRedirect = (path) => {
    history.push(path)
  }

  return (
    <div className="Home" style={classes.root}>
      <div style={classes.header}>
        <h1>Flash Cards</h1>
        
        <div>
          <button onClick={() => handleRedirect('/sign-up')}>Sign-Up</button>
          <button onClick={() => handleRedirect('/login')}>Login</button>
        </div>
      
      </div>

      <div style={classes.panel}>
        <p>{state.description}</p>

        <div style={classes.content}>
          <h3>Deck</h3>

          <section>
            <h4>Features</h4>
            <ul>
              {state.deck.features.map(feature => (
                <li key={feature.feature_id}>{feature.text}</li>
              ))}
            </ul>
          </section>
        </div>

        <div style={classes.content}>
          <h3>Card</h3>
          
          <section>
            <h4>Features</h4>
            <ul>
            {state.card.features.map(feature => (
              <li key={feature.feature_id}>{feature.text}</li>
            ))}
            </ul>
          </section>
          
        </div>

      </div>

    </div>
  );
}