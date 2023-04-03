import "../../styles/keyword/Describe.css";

import { useEffect, useRef, useState } from "react";

import { Box, Text } from "@chakra-ui/react";

import { useAppSelector } from "../../hooks/hooks";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const Describe = ({ title, content }) => {
  const titleContainer = useRef(null);
  const contentContainer = useRef(null);
  const cardRef = useRef(null);

  const clickedKeyword = useAppSelector(
    (state) => state.keyword.clickedKeyword
  );
  const clickedRank = useAppSelector((state) => state.keyword.clickedRank);
  const wordList = useAppSelector((state) => state.keyword.wordList);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mouseLeaveDelay, setMouseLeaveDelay] = useState(null);

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.from(".KeywordButton", {
      duration: 0.8,
      pointerEvents: "none",
    });
    tl.from(cardRef.current, { duration: 0.5, opacity: 0, ease: "sine.out" })
      .from(
        titleContainer.current,
        { duration: 0.7, opacity: 0, ease: "sine.out" },
        0.2
      )
      .from(contentContainer.current, { duration: 0.7, opacity: 0 }, 0.28);
    setWidth(cardRef.current.offsetWidth);
    setHeight(cardRef.current.offsetHeight);
  }, [clickedKeyword, clickedKeyword, clickedRank]);

  const mousePX = mouseX / width;
  const mousePY = mouseY / height;

  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
  };

  const cardBgTransform = {
    transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
  };
  const cardBgImage = {
    // backgroundImage: `url("https://picsum.photos/1600/800")`,
    backgroundImage: `url("https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=")`,
  };

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left - width / 2);
    setMouseY(e.clientY - rect.top - height / 2);
  };

  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveDelay);
  };

  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
  };
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        ref={cardRef}
        width={"85%"}
        height={"80%"}
        className="card-wrap"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box className={"card"} style={cardStyle}>
          <Box
            className={"card-bg"}
            style={{ ...cardBgTransform, ...cardBgImage }}
          ></Box>
          <Box
            position={"absolute"}
            left={"4%"}
            top={"15%"}
            className="card-info"
            color={"white"}
            width={"100%"}
          >
            <Box className="header" paddingLeft={"4%"}>
              <Text
                ref={titleContainer}
                fontSize={"8rem"}
                textAlign={"Start"}
                fontFamily={"dodum"}
                textShadow={"black 0 10px 10px"}
              >
                :{title}
              </Text>
            </Box>
            <Box className="content" paddingLeft={"3%"}>
              <Text
                ref={contentContainer}
                fontSize={"1.5rem"}
                textAlign={"Start"}
                textShadow={"black 0 2px 3px"}
              >
                {content}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Describe;
