import { Box } from "@chakra-ui/react";

const WiseSaying = ({ wiseSayingRef }) => {
  return (
    <Box
      height={"100%"}
      display={"grid"}
      gridTemplateRows={"repeat(6,1fr)"}
      marginRight={"2%"}
      color={"white"}
    >
      <Box
        ref={(el) => (wiseSayingRef.current[0] = el)}
        gridRow={"2/4"}
        display={"flex"}
        justifyContent={"end"}
        fontSize={"6xl"}
        fontFamily={"pak"}
        fontWeight={"bold"}
        textShadow={"1px 1px 3px black"}
      >
        당신이 어떤 위험을 감수하냐를 보면,
      </Box>
      <Box
        ref={(el) => (wiseSayingRef.current[1] = el)}
        gridRow={"4/6"}
        display={"flex"}
        justifyContent={"end"}
        fontSize={"6xl"}
        fontFamily={"pak"}
        fontWeight={"bold"}
        textShadow={"1px 1px 3px black"}
      >
        당신이 무엇을 가치있게 여기는지 알 수 있다.
      </Box>
      <Box
        ref={(el) => (wiseSayingRef.current[2] = el)}
        gridRow={"6/7"}
        display={"flex"}
        justifyContent={"end"}
        fontSize={"3xl"}
        fontFamily={"pak"}
        fontWeight={"bold"}
        textShadow={"1px 1px 3px black"}
      >
        - 자넷 윈터슨
      </Box>
    </Box>
  );
};

export default WiseSaying;
