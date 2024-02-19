import axios from "axios";
function OAuth() {
  function redirectToOAuth() {
    const clientId = "722ee22b46b4dbd64348";
    const redirectUri = "http://localhost:5173/callback";
    const clientSecret = "382ffd241addfe7e68ea5dd9949b703a2ec93336";
    const authURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
    window.location.replace(authURL);
  }

  return (
    <div>
      <h1>OAuth</h1>
      <button onClick={redirectToOAuth}>Click Me!</button>
    </div>
  );
}

export default OAuth;
