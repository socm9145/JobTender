import { useLayoutEffect, useEffect, useRef } from "react";

import { Box, Text } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const Describe = () => {
  const title = useRef();
  const content = useRef();

  const keywordDiscribe = [
    "안정 설명",
    "질서 설명",
    "관습 설명",
    "공헌 설명",
    "박애 설명",
    "자율 설명",
    "도전 설명",
    "재미 설명",
    "성취 설명",
    "권력 설명",
  ];

  const wordList = useAppSelector((state) => state.keyword.wordList);
  const clickedRank = useAppSelector((state) => state.keyword.clickedRank);
  const clickedKeyword = useAppSelector(
    (state) => state.keyword.clickedKeyword
  );
  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );

  useLayoutEffect(() => {
    gsap.from(title.current, { duration: 0.5, y: "100%", ease: "sine.out" });
    gsap.from(content.current, { duration: 0.7, opacity: 0 });
  }, [clickedKeyword]);

  return (
    <Box height={"100%"} paddingX={"10%"}>
      <Box paddingBottom={"1.5rem"} height={"fit-content"} overflow={"hidden"}>
        <Text ref={title} fontSize={"2rem"}>
          {wordList[clickedKeyword]}
        </Text>
      </Box>
      <Box>
        <Text ref={content} textAlign={"start"}>
          {keywordDiscribe[clickedKeyword]}
        </Text>
      </Box>
    </Box>
  );
};

export default Describe;
