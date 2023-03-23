import { Box } from "@chakra-ui/react";

import LeftKeyword from "../../components/keyword/LeftKeyword";
import RightKeyword from "../../components/keyword/RightKeyword";
import Describe from "../../components/keyword/Describe";

const Keyword = () => {
  return (
    <Box
      height={"100vh"}
      backgroundColor={"#f1efe9"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"80vh"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          width={"100vw"}
          height={"80%"}
        >
          <Box width={"25vw"}>
            <LeftKeyword />
          </Box>
          <Box flexGrow={"1"} display={"flex"} justifyContent={"center"}>
            <Describe />
          </Box>
          <Box width={"25vw"}>
            <RightKeyword />
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100vw"}
          height={"20%"}
        >
          <Box>순위</Box>
          <Box position={"absolute"} right={"10%"}>
            제출하기
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Keyword;
