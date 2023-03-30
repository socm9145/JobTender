import { useEffect } from "react";

import { Box, Image, Text } from "@chakra-ui/react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Describe = ({ title, fontsize }) => {
  // 왼쪽에서 나오는 컴포넌트인지 오른쪽에서 나오는 컴포넌트인지 판단하기 위해
  // id의 홀짝으로 구분함

  return (
    <Box
      className={"section"}
      position={"relative"}
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        className="bg"
        position={"absolute"}
        top={"0"}
        left={"0"}
        width={"100%"}
        height={"100%"}
        zIndex={"-1"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
      ></Box>

      <Text
        className={"firstscene"}
        color={"white"}
        textShadow={"5px 5px 5px black"}
        sx={{
          WebkitTextStroke: "1px black",
          textStroke: "1px black",
        }}
        zIndex={"1"}
        fontSize={fontsize}
        fontWeight={"400"}
      >
        {title}
      </Text>
    </Box>
  );
};

export default Describe;
