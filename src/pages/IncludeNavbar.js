import { Routes, Route } from "react-router-dom";

// 페이지 import
import Navbar from "../components/Navbar";
import Home from "./RoutePages/Home";
import Keyword from "./RoutePages/Keyword";
import Survey from "./RoutePages/Survey";
import Mypage from "./RoutePages/Mypage";
import LandingPage from "./RoutePages/LandingPage";

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
