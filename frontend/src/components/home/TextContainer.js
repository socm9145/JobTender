import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setButtonAble, setselectedMethod } from "../../redux/home/homeSlice";

import { Box, Text } from "@chakra-ui/react";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const TextContainer = () => {
  const selectedMethod = useAppSelector((state) => state.home.selectedMethod);
  const buttonAble = useAppSelector((state) => state.home.buttonAble);
  const dispatch = useAppDispatch();

  const onHandleMouseOver = (e) => {
    e.target.style.backgroundColor = "#191919";
    e.target.style.color = "#f7f6f1";
  };
  const onHandleMouseOut = (e) => {
    e.target.style.backgroundColor = "#f7f6f1";
    e.target.style.color = "#191919";
  };

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });
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
      .from("#next-button", { duration: 1, opacity: 0 }, 1.6)
      .from("#page-num-container", { duration: 1.3, opacity: 0 }, 1.6);
  }, []);

  useEffect(() => {
    gsap.from("#selected-method", {
      duration: 1,
      y: "100%",
      ease: "sine.out",
    });
    gsap.from("#expected-time", {
      duration: 1,
      y: "100%",
      ease: "sine.out",
    });
    gsap.from("#describe", {
      duration: 1,
      y: "100%",
      ease: "sine.out",
    });
    gsap.from("#page-num", {
      duration: 1,
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
    >
      <Box display={"flex"} flexDirection={"column"} overflow={"hidden"}>
        <Box id={"selected-method-title"} fontSize={"0.9rem"} color={"#969696"}>
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
          {selectedMethod ? <Text>키워드</Text> : <Text>설문조사</Text>}
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
              fontSize={"0.9rem"}
              color={"#969696"}
            >
              소요시간
            </Box>
            <Box id={"expected-time"} fontSize={"1rem"}>
              {selectedMethod ? <Text>1분</Text> : <Text>5분</Text>}
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            marginTop={"0.75em"}
            overflow={"hidden"}
          >
            <Box id={"describe-title"} fontSize={"0.9rem"} color={"#969696"}>
              설명
            </Box>
            <Box id={"describe"} fontSize={"1rem"}>
              {selectedMethod ? (
                <Text>
                  핵심 키워드를 선택하는 방법으로 보다 빠르게 결과를 확인할 수
                  있습니다.
                </Text>
              ) : (
                <Text>
                  여러 키워드에 관한 점수를 할당하는 방법으로 보다 정확한 결과를
                  확인할 수 있습니다.
                </Text>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"end"}
        >
          <Box
            id={"next-button"}
            width={"50%"}
            lineHeight={"2em"}
            border={"solid 1px #191919"}
            borderLeftRadius={"20px"}
            borderRightRadius={"20px"}
            textAlign={"center"}
            cursor={"pointer"}
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
            다음
          </Box>
          <Box
            id={"page-num-container"}
            display={"flex"}
            justifyContent={"center"}
            color={"#969696"}
            overflow={"hidden"}
          >
            <Text id={"page-num"}>{selectedMethod ? "01" : "02"}</Text>
            <Text>/02</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TextContainer;
