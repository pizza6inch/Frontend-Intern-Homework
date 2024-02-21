import OAuth from "./Page/OAuth";
import Page1 from "./Page/page1";
import Page2 from "./Page/page2";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OAuth />} />
          <Route path="/callback" element={<Page1 />} />
          <Route path="/callback2" element={<Page2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
