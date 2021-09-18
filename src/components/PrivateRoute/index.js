import { Redirect, Route } from "react-router";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
    { ...rest }
    render={props => {
      if(localStorage.getItem('token')){
        return <Component {...props} />
      }
      
      return <Redirect to="/login" />
    }}
    />
  );
};