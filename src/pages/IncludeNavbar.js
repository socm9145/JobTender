import { Routes, Route } from "react-router-dom";
// 페이지 import
import Navbar from "../components/Navbar";
import Home from "./router/Home";
import Keyword from "./router/Keyword";
import Survey from "./router/Survey";
import Mypage from "./router/Mypage";
import LandingPage from "./router/LandingPage";

import { Box } from "@chakra-ui/react";

const IncludeNavbar = () => {
  return (
    <div>
      <Navbar />
      <Box>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/keyword" element={<Keyword />}></Route>
          <Route path="/survey" element={<Survey />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>

          <Route path="/*" element={<LandingPage />}></Route>
        </Routes>
      </Box>
    </div>
  );
};

export default IncludeNavbar;
