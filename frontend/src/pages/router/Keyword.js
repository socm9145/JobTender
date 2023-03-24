import { Box } from "@chakra-ui/react";

import LeftKeywordsContainer from "../../components/keyword/LeftKeywordsContainer";
import RightKeywordsContainer from "../../components/keyword/RightKeywordsContainer";
import Describe from "../../components/keyword/Describe";
import KeywordRank from "../../components/keyword/KeywordRank";

const Keyword = () => {
  const wordList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "j"];
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
            <LeftKeywordsContainer keywords={wordList.slice(0, 5)} />
          </Box>
          <Box flexGrow={"1"} display={"flex"} justifyContent={"center"}>
            <Describe />
          </Box>
          <Box width={"25vw"}>
            <RightKeywordsContainer keywords={wordList.slice(5, 10)} />
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100vw"}
          height={"20%"}
        >
          <Box width={"60%"}>
            <KeywordRank />
          </Box>
          <Box position={"absolute"} right={"10%"}>
            제출하기
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Keyword;
