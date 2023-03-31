import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

const IncludeNavbar = () => {
  // const location = useLocation();
  // const [statusCode, setStatusCode] = useState(0);

  // useEffect(()=>{
  //   async function getUserInfo(){
  //     await reissue(
  //       data => {
  //         setStatusCode(data.status);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     )
  //   }
  //   getUserInfo();
  // }, [location])
  return (
    <div>
      <Navbar />
      <Box>
        <Routes>
          <Route path="/kakao" element={<Kakao />}></Route>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/keyword" element={<Keyword />}></Route>
          <Route path="/survey" element={<Survey />}></Route>
          <Route path="/result" element={<Result />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          {/* {
            statusCode===200 ? <Route path="/main/*" element={<PrivatePage />}></Route> : <Route path="/*" element={<PublicPage />}></Route>
          } */}
        </Routes>
      </Box>
    </div>
  );
};

export default IncludeNavbar;
