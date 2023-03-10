import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 import
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Keyword from "./pages/Keyword";
import Survey from "./pages/Survey";
import Mypage from "./pages/Mypage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Keyword" element={<Keyword />}></Route>
          <Route path="/Survey" element={<Survey />}></Route>
          <Route path="/my-page" element={<Mypage />}></Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
