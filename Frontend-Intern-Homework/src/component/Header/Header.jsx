import "./Header.css";
function Headers(props) {
  async function log() {
    if (props.name === "Guest") {
      window.location.href = "http://localhost:5173/login";
    } else {
      localStorage.removeItem("accessToken");
      window.location.href = "http://localhost:5173/home";
    }
  }

  async function goHome() {
    window.location.href = "http://localhost:5173/home";
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
