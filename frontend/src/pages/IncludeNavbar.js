import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { reissue } from "../api/userAxios"
// 페이지 import
import Home from "./router/Home";
import Keyword from "./router/Keyword";
import Survey from "./router/Survey";
import Mypage from "./router/Mypage";
import Result from "./router/Result";
import Navbar from "../components/Navbar";
import Welcome from "./router/Welcome";
import Login from "./router/Login";
import Kakao from "./router/Kakao";
import PrivateRoute from "./PrivateRoute";

const IncludeNavbar = () => {
  const getIsLogin = () => {
    return localStorage.getItem("isLogin");
  }
  return (
    // <div>
    //   <Navbar />
    //   <Box>
    //     <Routes>
    //       <Route path="/kakao" element={<Kakao />}></Route>
    //       <Route path="/" element={<Welcome />}></Route>
    //       <Route path="/login" element={<Login />}></Route>
    //       <Route path="/keyword" element={<Keyword />}></Route>
    //       <Route path="/survey" element={<Survey />}></Route>
    //       <Route path="/result" element={<Result />}></Route>
    //       <Route path="/mypage" element={<Mypage />}></Route>
    //       <Route path="/home" element={<Home />}></Route>
    //       {/* {
    //         statusCode===200 ? <Route path="/main/*" element={<PrivatePage />}></Route> : <Route path="/*" element={<PublicPage />}></Route>
    //       } */}
    //     </Routes>
    //   </Box>
    // </div>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" component={Welcome} />
        <PrivateRoute path="/login" component={Login} isAuthenticated={getIsLogin()} />
        <PrivateRoute path="/keyword" component={Keyword} isAuthenticated={getIsLogin()} />
        <PrivateRoute path="/survey" component={Survey} isAuthenticated={getIsLogin()} />
        <PrivateRoute path="/result" component={Result} isAuthenticated={getIsLogin()} />
        <PrivateRoute path="/mypage" component={Mypage} isAuthenticated={getIsLogin()} />
        <PrivateRoute path="/home" component={Home} isAuthenticated={getIsLogin()} />
      </Routes>
    </Router>
  );
};

export default IncludeNavbar;
