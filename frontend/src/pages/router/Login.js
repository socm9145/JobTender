import { useEffect } from "react";

import KakaoButton from "../../components/login/KakaoButton";
import LoginAnima from "../../components/login/LoginAnima";

import { Box, Text, Image } from "@chakra-ui/react";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const Login = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from("#horizontal-line-1", {
      duration: 1.8,
      opacity: 0,
      x: "-50vw",
      ease: "sine.out",
    })
      .from(
        "#horizontal-line-3",
        {
          duration: 1.8,
          opacity: 0,
          x: "-80%",
          ease: "sine.out",
        },
        0.4
      )
      .from(
        "#horizontal-line-2",
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
        "#vertical-line-1",
        {
          duration: 1.2,
          opacity: 0,
          y: "-60%",
          ease: "sine.out",
        },
        1.4
      )
      .from(
        "#kakao-button",
        {
          duration: 1.8,
          opacity: 0,
        },
        1.6
      );
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"#f1efe9"}
      color={"#191919"}
      width={"100vw"}
      height={"100vh"}
    >
      <Box
        id={"horizontal-line-1"}
        height={"0"}
        width={"100vw"}
        borderTop={"solid 1px black"}
      ></Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingY={"1.5rem"}
        height={"80vh"}
        width={"100vw"}
        overflow={"hidden"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          height={"100%"}
          alignItems={"center"}
        >
          <Box width={"35vw"} paddingX={"1.5rem"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              textAlign={"center"}
              fontSize={"3vw"}
              paddingBottom={"1%"}
              overflow={"hidden"}
            >
              <Text id={"login-message"} fontWeight={"semibold"}>
                Login to JobTender
              </Text>
            </Box>
            <Box
              id={"horizontal-line-2"}
              height={"0"}
              width={"100%"}
              borderTop={"solid 1px black"}
            ></Box>
            <Box id={"kakao-button"} paddingTop={"4%"}>
              <KakaoButton buttonWidth={"65%"} />
            </Box>
          </Box>
        </Box>
        <Box
          id={"vertical-line-1"}
          height={"100%"}
          width={"0"}
          borderLeft={"solid 1px black"}
        ></Box>
        <Box
          id={"image-container"}
          display={"flex"}
          justifyContent={"center"}
          width={"100%"}
          height={"100%"}
          padding={"10%"}
        >
          {/* 여기 이미지에 재밌는 애니메이션을 넣고 싶음 */}
          {/* <Image
            src={process.env.PUBLIC_URL + "/images/login_temp.gif"}
          ></Image> */}
          <LoginAnima />
        </Box>
      </Box>
      <Box
        id={"horizontal-line-3"}
        height={"0"}
        width={"100vw"}
        borderTop={"solid 1px black"}
      ></Box>
    </Box>
  );
};

// 로그인 아이콘과 글자 사이의 갭 설정

export default Login;
