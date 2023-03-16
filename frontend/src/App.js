import "./App.css";

// 페이지 import
import IncludeNavbar from "./pages/IncludeNavbar";

// chakra ui
import { Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

// css 참고 사이트
// https://www.cssdesignawards.com/sites/ipl-packaging/42665/
function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <IncludeNavbar />
      </div>
    </ChakraProvider>
  );
}

export default App;
