import { useLayoutEffect, useRef } from "react";

import LeftKeywordsContainer from "../../components/keyword/LeftKeywordsContainer";
import RightKeywordsContainer from "../../components/keyword/RightKeywordsContainer";
import DescribeContainer from "../../components/keyword/DescribeContainer";
import KeywordRankContainer from "../../components/keyword/KeywordRankContainer";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Box, Tooltip } from "@chakra-ui/react";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const Keyword = () => {
  const horizontalLine1 = useRef(null);
  const horizontalLine2 = useRef(null);
  const verticalLine1 = useRef(null);
  const verticalLine2 = useRef(null);
  const leftKeywords = useRef(null);
  const describe = useRef(null);
  const rightKeywords = useRef(null);
  const rankContainer = useRef(null);
  const submitButton = useRef(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    tl
      // .from(horizontalLine1.current, {
      //   duration: 1.8,
      //   opacity: 0,
      //   x: "-80vw",
      //   ease: "sine.out",
      // })
      // .from(
      //   verticalLine1.current,
      //   {
      //     duration: 1.8,
      //     opacity: 0,
      //     y: "-60%",
      //     ease: "sine.out",
      //   },
      //   0.5
      // )

      // .from(
      //   verticalLine2.current,
      //   {
      //     duration: 1.8,
      //     opacity: 0,
      //     y: "-60%",
      //     ease: "sine.out",
      //   },
      //   0.9
      // )

      // .from(
      //   horizontalLine2.current,
      //   {
      //     duration: 1.8,
      //     opacity: 0,
      //     x: "-80vw",
      //     ease: "sine.out",
      //   },
      //   0.8
      // )

      .from(
        rankContainer.current,
        {
          duration: 1,
          opacity: 0,
          x: "-5vw",
          ease: "sine.out",
        },
        1.7
      )
      .from(
        submitButton.current,
        {
          duration: 1.3,
          opacity: 0,
          x: "10vw",
          ease: "sine.out",
        },
        1.7
      );
  }, []);

  const wordList = useAppSelector((state) => state.keyword.wordList);
  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );

  const onHandleMouseOver = () => {
    gsap.to(submitButton.current, {
      duration: 0.2,
      backgroundColor: "#191919",
      color: "#f7f6f1",
    });
  };
  const onHandleMouseOut = () => {
    gsap.to(submitButton.current, {
      duration: 0.2,
      backgroundColor: "#f7f6f1",
      color: "#191919",
    });
  };

  return (
    <Box
      height={"100vh"}
      // backgroundColor={"#f1efe9"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"end"}
      paddingBottom={"3vh"}
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
        {/* <Box
          ref={horizontalLine1}
          width={"100%"}
          height={"0"}
          borderTop={"solid 1px black"}
        ></Box> */}
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
            {/* <Box
              ref={verticalLine1}
              width={"0"}
              height={"100%"}
              borderRight={"solid 1px black"}
            ></Box> */}
            <Box
              ref={describe}
              width={"40vw"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <DescribeContainer />
            </Box>
            {/* <Box
              ref={verticalLine2}
              width={"0"}
              height={"100%"}
              borderRight={"solid 1px black"}
            ></Box> */}
            <Box ref={rightKeywords} width={"25vw"}>
              <RightKeywordsContainer keywords={wordList.slice(5, 10)} />
            </Box>
          </Box>
        </Box>
        {/* <Box
          ref={horizontalLine2}
          width={"100%"}
          height={"0"}
          borderTop={"solid 1px black"}
        ></Box> */}
        <Box
          display={"flex"}
          justifyContent={"center"}
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
            position={"absolute"}
            bottom={"3vh"}
            right={"7rem"}
            width={"5rem"}
          >
            {selectedKeyword.includes(null) ? (
              <Tooltip
                label="순위에 들어갈 키워드를 모두 채워주세요!"
                placement="top"
              >
                <Box
                  ref={submitButton}
                  id={"next-button"}
                  width={"200%"}
                  lineHeight={"2em"}
                  border={"solid 1px #191919"}
                  borderLeftRadius={"20px"}
                  borderRightRadius={"20px"}
                  textAlign={"center"}
                  fontSize={"1.3rem"}
                >
                  제출
                </Box>
              </Tooltip>
            ) : (
              <Box
                className="hoverable"
                ref={submitButton}
                width={"200%"}
                lineHeight={"2em"}
                border={"solid 1px #191919"}
                borderLeftRadius={"20px"}
                borderRightRadius={"20px"}
                textAlign={"center"}
                // cursor={"pointer"}
                fontSize={"1.3rem"}
                onMouseOver={(e) => {
                  onHandleMouseOver(e);
                }}
                onMouseOut={(e) => {
                  onHandleMouseOut(e);
                }}
              >
                제출
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Keyword;
