import "./App.css";

// 페이지 import
import IncludeNavbar from "./pages/IncludeNavbar";

// chakra ui
import { Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

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
