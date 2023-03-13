import "./App.css";

// 페이지 import
import IncludeNavbar from "./pages/IncludeNavbar";

// chakra ui
import { Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Box className="App">
        <IncludeNavbar />
      </Box>
    </ChakraProvider>
  );
}

export default App;
