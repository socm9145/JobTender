import { useLayoutEffect } from "react";

import { useAppSelector } from "../../hooks/hooks";

import Keywords from "./Keywords";

import { Box } from "@chakra-ui/react";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const RightKeywordsContainer = ({ keywordName, keywordId }) => {
  const wordList = useAppSelector((state) => state.keyword.wordList);

  useLayoutEffect(() => {
    gsap.from(".keyword-r", {
      delay: 0.9,
      duration: 0.8,
      x: "100%",
      ease: "sine.out",
      stagger: 0.1,
    });
  }, [wordList]);
  return (
    <Box
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Box
        height={"80%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        {keywordName.map((word, index) => (
          <Box display={"flex"} key={index} justifyContent={"end"}>
            <Box className="keyword-r" width={"70%"} id={`right-word-${index}`}>
              <Keywords keyword={word} id={keywordId[index]} LR={"right"} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RightKeywordsContainer;
