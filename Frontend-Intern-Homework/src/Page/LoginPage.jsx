import axios from "axios";
import Hero from "../component/Hero/Hero";
import Header from "../component/Header/Header";
import "./LoginPage.css";
function LoginPage() {
  function redirectToOAuth() {
    const clientId = "722ee22b46b4dbd64348";
    const redirectUri = "http://localhost:5173/home";
    const clientSecret = "382ffd241addfe7e68ea5dd9949b703a2ec93336";
    const authURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;
    window.location.href = authURL;
  }

  return (
    <div className="LoginPage">
      <Header name="Guest" />
      <div className="Content">
        <div className="Text">
          <div className="Top-Text">
            <div className="span">G</div>
            <div className="span">I</div>
            <div className="span">T</div>
            <div className="span">H</div>
            <div className="span">U</div>
            <div className="span">B</div>
          </div>
          <div className="Bottom-Text">
            <div className="span">B</div>
            <div className="span">L</div>
            <div className="span">O</div>
            <div className="span">G</div>
          </div>
        </div>
        <button onClick={redirectToOAuth}>Login with Github</button>
      </div>
    </div>
  );
}

export default LoginPage;
