import { useLayoutEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setSelectedKeyword } from "../../redux/keyword/keywordSlice";

import { Box, Text } from "@chakra-ui/react";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const RightKeyword = ({ keyword, id }) => {
  const text = useRef();
  const line = useRef();
  const dispatch = useAppDispatch();
  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );

  const dispatchSelectedKeywordId = () => {
    if (selectedKeyword === id) {
      gsap.to([text.current, line.current], {
        duration: 0.5,
        x: "0",
        ease: "sine.out",
      });
      dispatch(setSelectedKeyword(null));
    } else {
      dispatch(setSelectedKeyword(id));
    }
  };
  const ctx = gsap.context(() => {});

  useLayoutEffect(() => {
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    ctx.add(() => {
      gsap.to([text.current, line.current], {
        duration: 0.5,
        x: selectedKeyword === id ? "-10rem" : "0px",
        ease: "sine.out",
      });
    });
  }, [selectedKeyword]);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box display={"flex"} justifyContent={"start"}>
        <Text
          ref={text}
          fontSize={"2rem"}
          cursor={"pointer"}
          onClick={() => {
            dispatchSelectedKeywordId();
          }}
        >
          {keyword}
        </Text>
      </Box>
      <Box ref={line} borderTop={"solid 1px black"}></Box>
    </Box>
  );
};

export default RightKeyword;
