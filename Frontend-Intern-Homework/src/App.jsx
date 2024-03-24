import LoginPage from "./Page/LoginPage";
import Home from "./Page/Home";
import PostPage from "./Page/PostPage";
import NewIssue from "./Page/NewIssue";
import EditIssue from "./Page/EditIssue";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/newIssue" element={<NewIssue />} />
          <Route path="/editIssue" element={<EditIssue />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
