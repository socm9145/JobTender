import "./App.css";

// 페이지 import
import IncludeNavbar from "./pages/IncludeNavbar";

// chakra ui
import { ChakraProvider } from "@chakra-ui/react";
// css 참고 사이트
// https://www.varino.pt/en

import { extendTheme } from "@chakra-ui/react";

import "@fontsource/gowun-dodum";

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
