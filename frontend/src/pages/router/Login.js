import { useEffect } from "react";

import KakaoButton from "../../components/login/KakaoButton";

import { Box, Text, Image } from "@chakra-ui/react";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const Login = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(
      "#horizontal-line",
      {
        duration: 1.5,
        opacity: 0,
        x: "-50%",
        ease: "sine.out",
      },
      0.8
    )
      .from(
        "#login-message",
        {
          duration: 0.8,
          opacity: 0,
          y: "100%",
          ease: "sine.out",
        },
        1
      )

      .from(
        "#kakao-button",
        {
          duration: 1.8,
          opacity: 0,
        },
        1
      );
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      color={"#191919"}
      width={"100vw"}
      height={"100vh"}
      backgroundImage={"./images/login/login.jpg"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingY={"1.5rem"}
        height={"80vh"}
        width={"100vw"}
        overflowY={"hidden"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          height={"100%"}
          alignItems={"center"}
          paddingLeft={"5vw"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"35vw"}
            paddingX={"1.5rem"}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              textAlign={"center"}
              fontSize={"3vw"}
              overflow={"hidden"}
            >
              <Text
                id={"login-message"}
                color={"white"}
                textShadow={"1px 1px 3px black"}
                fontWeight={"semibold"}
              >
                Login to JobTender
              </Text>
            </Box>
            <Box
              id={"horizontal-line"}
              height={"0"}
              width={"87%"}
              borderTop={"solid 1px white"}
              boxShadow={"1px 1px 3px black"}
            ></Box>
            <Box id={"kakao-button"} marginTop={"4%"}>
              <KakaoButton buttonWidth={"65%"} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// 로그인 아이콘과 글자 사이의 갭 설정

export default Login;
