import "./Header.css";
import { useHistory } from "react-router-dom";
function Headers(props) {
  const history = useHistory();
  async function log() {
    if (props.name === "Guest") {
      history.push("/login");
    } else {
      localStorage.removeItem("accessToken");
      history.push("/login");
    }
  }

  async function goHome() {
    history.push("/login");
  }
  return (
    <div className="Header">
      <nav className="Navbar">
        <div className="Text">Welcome! {props.name}</div>
        <div className="Menu">
          <div className="Home" onClick={goHome}>
            Home
          </div>
          <div className="Log" onClick={() => log(props.name)}>
            {props.name === "Guest" ? "Login" : "Logout"}
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Headers;
