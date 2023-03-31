import { useLayoutEffect, useRef, useState } from "react";

import KeywordRank from "./KeywordRank";

import { Box, Text } from "@chakra-ui/react";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const KeywordRankContainer = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
    >
      <KeywordRank rank={0} />
      <KeywordRank rank={1} />
      <KeywordRank rank={2} />
    </Box>
  );
};

export default KeywordRankContainer;
