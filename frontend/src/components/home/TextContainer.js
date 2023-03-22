import { Box, Text } from "@chakra-ui/react";

const TextContainer = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100%"}
      padding={"40px 40px 40px 0"}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <Box fontSize={"0.9rem"} color={"#969696"}>
          조사방법
        </Box>
        <Box
          fontSize={"2rem"}
          fontFamily={"dodum"}
          lineHeight={"1"}
          marginTop={"0.2em"}
          letterSpacing={"0.15em"}
        >
          키워드
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        flexGrow={"1"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} flexDirection={"column"} marginTop={"1.6em"}>
          <Box display={"flex"} flexDirection={"column"}>
            <Box fontSize={"0.9rem"} color={"#969696"}>
              소요시간
            </Box>
            <Box fontSize={"1rem"}>5분</Box>
          </Box>
          <Box display={"flex"} flexDirection={"column"} marginTop={"0.75em"}>
            <Box fontSize={"0.9rem"} color={"#969696"}>
              설명
            </Box>
            <Box fontSize={"1rem"}>이러이러한 장점이 있는 조사방법입니다</Box>
          </Box>
        </Box>
        <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
          <Box
            width={"50%"}
            display={"flex"}
            borderY={"solid 1px black"}
            borderX={"solid 1px black"}
            borderStartRadius={"20px"}
            borderEndRadius={"20px"}
            lineHeight={"2em"}
          >
            <Box width={"50%"} display={"flex"} justifyContent={"center"}>
              좌
            </Box>
            <Box
              height={"100%"}
              width={"0"}
              borderLeft={"solid 1px black"}
            ></Box>
            <Box width={"50%"} display={"flex"} justifyContent={"center"}>
              우
            </Box>
          </Box>
          <Box>01/02</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TextContainer;
