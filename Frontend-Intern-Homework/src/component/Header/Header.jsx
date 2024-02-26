import "./Header.css";
function Headers(props) {
  async function logout() {
    localStorage.removeItem("accessToken");
    window.location.replace("http://localhost:5173");
  }

  return (
    <div className="Header">
      <nav className="Navbar">
        <div className="Text">Welcome! {props.name}</div>
        <div className="Menu">
          <div className="LogOut" onClick={logout}>
            Log out
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Headers;
