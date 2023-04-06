import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setButtonAble, setselectedMethod } from "../../redux/home/homeSlice";

import { Box, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const TextContainer = () => {
  const nextButton = useRef(null);
  const selectedMethod = useAppSelector((state) => state.home.selectedMethod);
  const buttonAble = useAppSelector((state) => state.home.buttonAble);
  const dispatch = useAppDispatch();

  const onHandleMouseOver = () => {
    gsap.to(nextButton.current, {
      duration: 0.2,
      backgroundColor: "RGBA(255, 255, 255, 0.80)",
      color: "black",
    });
  };
  const onHandleMouseOut = () => {
    gsap.to(nextButton.current, {
      duration: 0.2,
      backgroundColor: "transparent",
      color: "RGBA(255, 255, 255, 0.80)",
    });
  };

  useEffect(() => {
    const tl = gsap.timeline({ delay: 5 });
    tl.from("#selected-method", {
      duration: 1,
      y: "100%",
      ease: "sine.out",
    })
      .from("#selected-method-title", {
        duration: 1,
        opacity: 0,
      })
      .from(
        "#expected-time",
        {
          duration: 1,
          y: "100%",
          ease: "sine.out",
        },
        0.2
      )
      .from("#expected-time-title", { duration: 1, opacity: 0 }, 1.2)
      .from(
        "#describe",
        {
          duration: 1,
          y: "100%",
          ease: "sine.out",
        },
        0.6
      )
      .from("#describe-title", { duration: 1, opacity: 0 }, 1.4)
      .from(nextButton.current, { duration: 1, opacity: 0 }, 1.6)
      .from("#page-num-container", { duration: 1.3, opacity: 0 }, 1.6);
  }, []);

  useEffect(() => {
    gsap.from("#selected-method", {
      duration: 0.7,
      y: "100%",
      ease: "sine.out",
    });
    gsap.from("#expected-time", {
      duration: 0.7,
      y: "100%",
      ease: "sine.out",
    });
    gsap.from("#describe", {
      duration: 0.7,
      y: "100%",
      ease: "sine.out",
    });
    gsap.from("#page-num", {
      duration: 0.7,
      y: "100%",
      ease: "sine.out",
    });
  }, [selectedMethod]);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100%"}
      padding={"40px 40px 40px 0"}
      color={"white"}
    >
      <Box display={"flex"} flexDirection={"column"} overflow={"hidden"}>
        <Box
          id={"selected-method-title"}
          zIndex={"1"}
          fontSize={"0.9rem"}
          color={"whiteAlpha.800"}
        >
          <Text>조사방법</Text>
        </Box>
        <Box
          id={"selected-method"}
          fontSize={"2rem"}
          fontFamily={"dodum"}
          lineHeight={"1"}
          marginTop={"0.2em"}
          letterSpacing={"0.15em"}
        >
          {selectedMethod ? <Text>키워드</Text> : <Text>가치관</Text>}
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        flexGrow={"1"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} flexDirection={"column"} marginTop={"1.6em"}>
          <Box display={"flex"} flexDirection={"column"} overflow={"hidden"}>
            <Box
              id={"expected-time-title"}
              zIndex={"1"}
              fontSize={"0.9rem"}
              color={"whiteAlpha.800"}
            >
              소요시간
            </Box>
            <Box
              id={"expected-time"}
              fontSize={"1rem"}
              fontFamily={"taebaek"}
              fontWeight={"bold"}
            >
              {selectedMethod ? <Text>1분</Text> : <Text>5분</Text>}
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            marginTop={"0.75em"}
            overflow={"hidden"}
          >
            <Box
              id={"describe-title"}
              zIndex={"1"}
              fontSize={"0.9rem"}
              color={"whiteAlpha.800"}
            >
              설명
            </Box>
            <Box
              id={"describe"}
              fontSize={"1rem"}
              fontFamily={"taebaek"}
              fontWeight={"bold"}
            >
              {selectedMethod ? (
                <Text>
                  나에게 중요한 세 개의 가치관을 선택해서 나와 맞는 기업을 쉽고
                  빠르게 확인할 수 있습니다.
                </Text>
              ) : (
                // 57개를 선택해야 하는 수고로움에 대한 사전 설명 필요하지 않나
                <Text>
                  가치관 검사를 통해 자신의 가치관을 보다 정확히 이해하고, 보다
                  정밀한 기업 추천을 받을 수 있습니다.
                </Text>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          width={"100%"}
          height={"5%"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"end"}
        >
          <Box
            className="hoverable"
            ref={nextButton}
            zIndex={"1"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"45%"}
            height={"130%"}
            lineHeight={"2em"}
            border={"solid 1px white"}
            borderLeftRadius={"20px"}
            borderRightRadius={"20px"}
            // cursor={"pointer"}
            onMouseOver={(e) => {
              onHandleMouseOver(e);
            }}
            onMouseOut={(e) => {
              onHandleMouseOut(e);
            }}
            onClick={() => {
              if (buttonAble) {
                dispatch(setButtonAble(false));
                dispatch(setselectedMethod());
              }
            }}
          >
            <Box className="hoverable">
              {/* <Text className="hoverable"> -> </Text> */}
              <ArrowForwardIcon zIndex={-2} className="hoverable" boxSize={6} />
            </Box>
          </Box>
          <Box
            id={"page-num-container"}
            display={"flex"}
            justifyContent={"center"}
            color={"whiteAlpha.800"}
            overflow={"hidden"}
          >
            <Text id={"page-num"}>{selectedMethod ? "01" : "02"}</Text>
            <Text zIndex={"1"}>/02</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TextContainer;
