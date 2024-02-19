import axios from "axios";
import gitAPI from "../API";

function Page1() {
  function getInfo() {
    const code = new URLSearchParams(window.location.search).get("code");
    const clientId = "722ee22b46b4dbd64348";
    const clientSecret = "382ffd241addfe7e68ea5dd9949b703a2ec93336";
    gitAPI.post();
  }
  return (
    <div>
      <h1>Nice!</h1>
      <button onClick={getInfo}>Get Info</button>
    </div>
  );
}

export default Page1;
