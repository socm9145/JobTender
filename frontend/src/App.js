import { useEffect } from "react";

import "./App.css";

// 페이지 import
import IncludeNavbar from "./pages/IncludeNavbar";

//마우스 포인터
import MousePointer from "./components/MousePointer";

// chakra ui
import { ChakraProvider } from "@chakra-ui/react";
// css 참고 사이트
// https://www.varino.pt/en

import { extendTheme } from "@chakra-ui/react";

// font
import "@fontsource/gowun-dodum";

// 전역으로 font 사용할 수 있도록 함
const theme = extendTheme({
  fonts: {
    dodum: `'gowun Dodum', sans-serif`,
  },
});

function App() {
  // useEffect(() => {
  //   document.body.style.cursor = "none";
  // }, []);
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
            <svg height="10" width="10">
              <circle cx="5" cy="5" r="4" strokeWidth="0"></circle>
            </svg>
          </div>
        </div>

        <IncludeNavbar />
      </div>
    </ChakraProvider>
  );
}

export default App;
