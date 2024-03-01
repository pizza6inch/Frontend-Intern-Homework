import OAuth from "./Page/OAuth";
import Home from "./Page/Home";
import PostPage from "./Page/PostPage";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OAuth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
