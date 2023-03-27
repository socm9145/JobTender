import { useLayoutEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  setClickedRank,
  setClickedKeyword,
  setSelectedKeyword,
} from "../../redux/keyword/keywordSlice";

import { Box, Text } from "@chakra-ui/react";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const Keyword = ({ keyword, id, LR }) => {
  const text = useRef();
  const line = useRef();

  const dispatch = useAppDispatch();
  const clickedRank = useAppSelector((state) => state.keyword.clickedRank);
  const clickedKeyword = useAppSelector(
    (state) => state.keyword.clickedKeyword
  );
  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );

  const dispatchClickedKeywordId = () => {
    if (clickedKeyword === id) {
      gsap.to([text.current, line.current], {
        duration: 0.5,
        x: "0",
        ease: "sine.out",
      });
      dispatch(setClickedKeyword(null));
    } else {
      dispatch(setClickedKeyword(id));
    }
  };

  const dispatchSelectedKeyword = () => {
    if (!selectedKeyword.includes(id)) {
      dispatch(setSelectedKeyword([clickedRank, id]));
      dispatch(setClickedKeyword(null));
      dispatch(setClickedRank(null));
    }
  };

  const ctx = gsap.context(() => {});
  useLayoutEffect(() => {
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const animaDistance =
      parseInt(document.querySelector(".left-words-container").offsetWidth) -
      parseInt(document.querySelector(".text-container").offsetWidth);

    ctx.add(() => {
      gsap.to([text.current, line.current], {
        duration: 0.5,
        x:
          clickedKeyword === id || selectedKeyword.includes(id)
            ? LR === "left"
              ? animaDistance
              : -animaDistance
            : "0px",
        ease: "sine.out",
        backgroundColor: selectedKeyword.includes(id) ? "#191919" : null,
        color: selectedKeyword.includes(id) ? "#f7f6f1" : null,
      });
    });
  }, [clickedKeyword, selectedKeyword, clickedRank]);

  return (
    <Box className={"text-container"} display={"flex"} flexDirection={"column"}>
      <Box display={"flex"} justifyContent={LR === "left" ? "end" : "start"}>
        <Text
          ref={text}
          paddingX={"0.5rem"}
          fontSize={"2rem"}
          fontFamily={"dodum"}
          cursor={"pointer"}
          onClick={() => {
            if (
              clickedRank === null &&
              !selectedKeyword.includes(id) &&
              selectedKeyword.includes(null)
            ) {
              dispatchClickedKeywordId();
            } else {
              dispatchSelectedKeyword();
            }
          }}
        >
          {keyword}
        </Text>
      </Box>
      <Box ref={line} borderTop={"solid 1px black"}></Box>
    </Box>
  );
};

export default Keyword;
