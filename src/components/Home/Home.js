import { useHistory } from "react-router";

export const Home = () => {
  const history = useHistory();

  const handleRedirect = (path) => {
    history.push(path)
  }
  return (
    <div className="Home">
      <button onClick={() => handleRedirect('/login')}>Login</button>
    </div>
  );
}