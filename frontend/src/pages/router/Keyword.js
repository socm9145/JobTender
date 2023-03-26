import { Box } from "@chakra-ui/react";

import LeftKeywordsContainer from "../../components/keyword/LeftKeywordsContainer";
import RightKeywordsContainer from "../../components/keyword/RightKeywordsContainer";
import Describe from "../../components/keyword/Describe";
import KeywordRankContainer from "../../components/keyword/KeywordRankContainer";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
const Keyword = () => {
  const wordList = useAppSelector((state) => state.keyword.wordList);
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
          height={"70%"}
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
          height={"30%"}
        >
          <Box
            width={"50%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <KeywordRankContainer />
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
