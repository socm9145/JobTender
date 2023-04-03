import { useEffect, useLayoutEffect, useRef } from "react";

import LeftKeywordsContainer from "../../components/keyword/LeftKeywordsContainer";
import RightKeywordsContainer from "../../components/keyword/RightKeywordsContainer";
import DescribeContainer from "../../components/keyword/DescribeContainer";
import KeywordRankContainer from "../../components/keyword/KeywordRankContainer";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Box, Text } from "@chakra-ui/react";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const Keyword = () => {
  const leftKeywords = useRef(null);
  const describe = useRef(null);
  const rightKeywords = useRef(null);
  const rankContainer = useRef(null);
  const submitButtonBox = useRef(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    tl.to(submitButtonBox.current, {
      duration: 0,
      opacity: 1,
      x: "100%",
      ease: "sine.out",
    }).from(
      rankContainer.current,
      {
        duration: 1,
        opacity: 0,
        x: "-5vw",
        ease: "sine.out",
      },
      1.7
    );
  }, []);

  const wordList = useAppSelector((state) => state.keyword.wordList);
  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );

  useEffect(() => {
    if (!selectedKeyword.includes(null)) {
      gsap.to(submitButtonBox.current, {
        duration: 1,
        opacity: 1,
        x: "0",
        ease: "sine.out",
      });
    } else {
      gsap.to(submitButtonBox.current, {
        duration: 1,
        opacity: 1,
        x: "100%",
        ease: "sine.out",
      });
    }
  }, [selectedKeyword]);

  return (
    <Box
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"end"}
      backgroundImage={"https://picsum.photos/1600/800"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"88vh"}
      >
        <Box width={"100vw"} height={"100%"} paddingY={"1rem"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={"100vw"}
            height={"100%"}
            overflow={"hidden"}
          >
            <Box ref={leftKeywords} width={"25vw"}>
              <LeftKeywordsContainer keywords={wordList.slice(0, 5)} />
            </Box>

            <Box
              ref={describe}
              width={"40vw"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <DescribeContainer />
            </Box>

            <Box ref={rightKeywords} width={"25vw"}>
              <RightKeywordsContainer keywords={wordList.slice(5, 10)} />
            </Box>
          </Box>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"end"}
          alignItems={"center"}
          width={"100vw"}
          height={"30%"}
        >
          <Box
            ref={rankContainer}
            width={"60%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <KeywordRankContainer />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"end"}
            width={"20%"}
            height={"100%"}
          >
            <Box
              ref={submitButtonBox}
              className={"hoverable"}
              height={"40%"}
              width={"60%"}
              marginLeft={"40%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={"white"}
            >
              <Text className={"hoverable"} fontSize={"2em"}>
                제출
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Keyword;
