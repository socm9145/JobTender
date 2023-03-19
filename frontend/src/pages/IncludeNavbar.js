import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
// 페이지 import
import Navbar from "../components/Navbar";
import Welcome from "./router/Welcome";
import Login from "./router/Login";
import Home from "./router/Home";
import Keyword from "./router/Keyword";
import Survey from "./router/Survey";
import Mypage from "./router/Mypage";
import LandingPage from "./router/LandingPage";
import Kakao from "./router/Kakao";

const IncludeNavbar = () => {
  return (
    <div>
      <Navbar />

      <Box>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/keyword" element={<Keyword />}></Route>
          <Route path="/survey" element={<Survey />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/kakao" element={<Kakao />}></Route>

          <Route path="/*" element={<LandingPage />}></Route>
        </Routes>
      </Box>
    </div>
  );
};

export default IncludeNavbar;
