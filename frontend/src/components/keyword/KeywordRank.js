import { useLayoutEffect, useRef, useState } from "react";

import { Box, Text } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  setClickedRank,
  setClickedKeyword,
  setSelectedKeyword,
} from "../../redux/keyword/keywordSlice";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const KeywordRank = ({ rank }) => {
  const line = useRef(null);
  const addButton = useRef(null);
  const rankContainer = useRef(null);
  const lineContainer = useRef(null);
  const inKeyword = useRef(null);

  const dispatch = useAppDispatch();
  const wordList = useAppSelector((state) => state.keyword.wordList);
  const clickedRank = useAppSelector((state) => state.keyword.clickedRank);
  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );

  const dispatchClickedRank = () => {
    if (clickedRank === rank || selectedKeyword[rank] !== null) {
      gsap.to(line.current, {
        duration: 0.5,
        x: "0",
        ease: "sine.out",
      });
      gsap.to(addButton.current, {
        duration: 0.5,
        rotate: 0,
        ease: "sine.out",
      });
      dispatch(setClickedRank(null));
    } else {
      dispatch(setClickedRank(rank));
    }
  };
  const dispatchSelectedKeyword = () => {
    dispatch(setSelectedKeyword([rank, null]));
  };

  const ctx = gsap.context(() => {});
  useLayoutEffect(() => {
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const lineDistance =
      lineContainer.current.offsetWidth -
      rankContainer.current.offsetWidth * 0.4;
    ctx.add(() => {
      gsap.to(line.current, {
        duration: 0.5,
        x:
          clickedRank === rank || selectedKeyword[rank] !== null
            ? lineDistance
            : "0px",
        ease: "sine.out",
      });
      gsap.to(addButton.current, {
        duration: 0.5,
        rotate:
          clickedRank === rank || selectedKeyword[rank] !== null ? 135 : 0,
        ease: "sine.out",
      });
    });
  }, [clickedRank]);

  useLayoutEffect(() => {
    gsap.from(inKeyword.current, {
      duration: 0.5,
      opacity: 0,
      ease: "sine.out",
    });
  }, [selectedKeyword[rank]]);
  return (
    <Box
      id={"rankContainer"}
      ref={rankContainer}
      width={"25%"}
      position={"relative"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"end"}
      overflow={"hidden"}
    >
      <Box
        ref={lineContainer}
        width={"100%"}
        display={"flex"}
        alignItems={"end"}
      >
        <Box>
          <Text fontSize={"3rem"} lineHeight={"1"}>
            {rank + 1}.
          </Text>
        </Box>
        <Box
          lineHeight={"1.2"}
          width={"100%"}
          flexGrow={"1"}
          textAlign={"center"}
          fontSize={"2.5rem"}
          fontFamily={"dodum"}
          paddingRight={"2rem"}
        >
          <Text ref={inKeyword}>{wordList[selectedKeyword[rank]]}</Text>
        </Box>
      </Box>
      <Box
        ref={line}
        position={"absolute"}
        right={"60%"}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"end"}
      >
        <Box
          ref={addButton}
          onClick={() => {
            if (selectedKeyword[rank] === null) {
              dispatch(setClickedKeyword(null));
              dispatchClickedRank();
            } else {
              dispatchClickedRank();
              dispatchSelectedKeyword();
            }
          }}
          width={"2rem"}
        >
          <Text
            fontSize={"3rem"}
            lineHeight={"1"}
            verticalAlign={"top"}
            cursor={"pointer"}
          >
            <SmallAddIcon boxSize={"10"} />
          </Text>
        </Box>
        <Box width={"100%"} borderTop={"solid 1px black"}></Box>
      </Box>
    </Box>
  );
};

export default KeywordRank;
