import { Routes, Route } from "react-router-dom";

import "./App.css";

// 페이지 import
import Home from "./pages/router/Home";
import Keyword from "./pages/router/Keyword";
import Survey from "./pages/router/Survey";
import Mypage from "./pages/router/Mypage";
import Result from "./pages/router/Result";
import Navbar from "./components/Navbar";
import Welcome from "./pages/router/Welcome";
import Login from "./pages/router/Login";
import Kakao from "./pages/router/Kakao";
import PrivateRoute from "./pages/PrivateRoute";

//마우스 포인터
import MousePointer from "./components/MousePointer";

// chakra ui
import { ChakraProvider } from "@chakra-ui/react";
// css 참고 사이트
// https://www.varino.pt/en

import { extendTheme } from "@chakra-ui/react";

// font
import "@fontsource/gowun-dodum";
// import Navbar from "./components/Navbar";

// 전역으로 font 사용할 수 있도록 함
const theme = extendTheme({
  fonts: {
    dodum: `'gowun Dodum', sans-serif`,
  },
});

function App() {
  MousePointer();

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <div className="cursor">
          <div className="cursor__ball cursor__ball--big">
            <svg height="30" width="30">
              <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
            </svg>
          </div>
          <div className="cursor__ball cursor__ball--small">
            <svg height="15" width="15">
              <circle cx="7.5" cy="7.5" r="6" strokeWidth="0"></circle>
            </svg>
          </div>
        </div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/kakao" element={<Kakao /> }   />
          <Route path="/keyword" element={
            <PrivateRoute>
              <Keyword />
            </PrivateRoute>
            }
          />
          <Route path="/survey" element={
            <PrivateRoute>
              <Survey />
            </PrivateRoute>
            }
          />
          <Route path="/result" element={
            <PrivateRoute>
              <Result />
            </PrivateRoute>
            }
          />
          <Route path="/mypage" element={
            <PrivateRoute>
              <Mypage />
            </PrivateRoute>
            }
          />
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
            }
          />
        </Routes>
       </div>
     </ChakraProvider>
  );
}

export default App;
