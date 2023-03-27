import { useLayoutEffect } from "react";

import Keywords from "./Keywords";

import { Box } from "@chakra-ui/react";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const LeftKeywordsContainer = ({ keywords }) => {
  useLayoutEffect(() => {
    gsap.from(".keyword", {
      delay: 0.6,
      duration: 0.8,
      x: "-100%",
      ease: "sine.out",
      stagger: 0.1,
    });
  }, []);
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
        {keywords.map((word, index) => (
          <Box
            display={"flex"}
            key={index}
            justifyContent={"start"}
            className={"left-words-container"}
          >
            <Box className="keyword" width={"70%"} id={`left-word-${index}`}>
              <Keywords keyword={word} id={index} LR={"left"} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LeftKeywordsContainer;
