import { useLayoutEffect, useRef, useState } from "react";

import KeywordRank from "./KeywordRank";

import { Box, Text } from "@chakra-ui/react";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const KeywordRankContainer = () => {
  return (
    <Box
      position={"relative"}
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
    >
      <Box
        width={"100%"}
        height={"100%"}
        position={"absolute"}
        backgroundColor={"black"}
        borderTopRadius={"40px"}
        borderX={"solid 5px white"}
        borderTop={"solid 5px white"}
        opacity={"0.5"}
      ></Box>
      <KeywordRank rank={0} />
      <KeywordRank rank={1} />
      <KeywordRank rank={2} />
    </Box>
  );
};

export default KeywordRankContainer;
