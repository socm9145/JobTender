import { Routes, Route } from "react-router-dom";

// 페이지 import
import Navbar from "../components/Navbar";
import Home from "./router/Home";
import Keyword from "./router/Keyword";
import Survey from "./router/Survey";
import Mypage from "./router/Mypage";
import LandingPage from "./router/LandingPage";

const IncludeNavbar = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Keyword" element={<Keyword />}></Route>
        <Route path="/Survey" element={<Survey />}></Route>
        <Route path="/my-page" element={<Mypage />}></Route>

        <Route path="/*" element={<LandingPage />}></Route>
      </Routes>
    </div>
  );
};

export default IncludeNavbar;
