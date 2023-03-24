import { useLayoutEffect, useRef, useState } from "react";

import { Box, Text } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  setClickedRank,
  setSelectedKeyword,
} from "../../redux/keyword/keywordSlice";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const KeywordRank = ({ rank }) => {
  const line = useRef(null);
  const addButton = useRef(null);

  const dispatch = useAppDispatch();
  const clickedRank = useAppSelector((state) => state.keyword.clickedRank);
  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );

  const dispatchClickedRank = () => {
    if (clickedRank === rank) {
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

  const ctx = gsap.context(() => {});
  useLayoutEffect(() => {
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    ctx.add(() => {
      gsap.to(line.current, {
        duration: 0.5,
        x:
          (clickedRank === rank) | (selectedKeyword[rank] !== null)
            ? "130px"
            : "0px",
        ease: "sine.out",
      });
      gsap.to(addButton.current, {
        duration: 0.5,
        rotate: clickedRank === rank ? 135 : 0,
        ease: "sine.out",
      });
    });
  }, [clickedRank]);
  return (
    <Box
      width={"30%"}
      position={"relative"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"end"}
      overflow={"hidden"}
    >
      <Box display={"flex"} alignItems={"end"}>
        <Box>
          <Text fontSize={"3rem"} lineHeight={"1"}>
            {rank}.
          </Text>
        </Box>
        <Box
          flexGrow={"1"}
          marginRight={"2rem"}
          textAlign={"center"}
          fontSize={"2rem"}
        >
          {selectedKeyword[rank]}
        </Box>
      </Box>
      <Box
        ref={line}
        position={"absolute"}
        right={"60%"}
        width={"200%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"end"}
      >
        <Box
          ref={addButton}
          onClick={() => {
            dispatchClickedRank();
          }}
          width={"2rem"}
        >
          <Text fontSize={"3rem"} lineHeight={"1"} verticalAlign={"top"}>
            +
          </Text>
        </Box>
        <Box width={"100%"} borderTop={"solid 1px black"}></Box>
      </Box>
    </Box>
  );
};

export default KeywordRank;
