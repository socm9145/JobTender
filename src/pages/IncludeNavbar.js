import { Routes, Route } from "react-router-dom";

// 페이지 import
import Welcome from "./RoutePages/Welcome";
import Login from "./RoutePages/Login";
import Home from "./RoutePages/Home";
import Keyword from "./RoutePages/Keyword";
import Survey from "./RoutePages/Survey";
import Mypage from "./RoutePages/Mypage";
import NotFound from "./RoutePages/NotFound";

const IncludeNavbar = () => {
  return (
    <div>
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
  );
};

export default IncludeNavbar;
