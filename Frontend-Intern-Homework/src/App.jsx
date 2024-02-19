import OAuth from "./Page/OAuth";
import Page1 from "./Page/page1";
import ReactDOM from "react-dom";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OAuth />} />
        <Route path="/callback" element={<Page1 />} />
      </Routes>
    </div>
  );
}

export default App;
