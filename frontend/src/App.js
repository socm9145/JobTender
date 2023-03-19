import "./App.css";

// 페이지 import
import IncludeNavbar from "./pages/IncludeNavbar";

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
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <IncludeNavbar />
      </div>
    </ChakraProvider>
  );
}

export default App;
