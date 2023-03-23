import { background, Box, Text } from "@chakra-ui/react";

const TextContainer = ({ selectedTest, setSelectedTest }) => {
  console.log("text");
  console.log(selectedTest);
  const onHandleMouseOver = (e) => {
    e.target.style.backgroundColor = "#191919";
    e.target.style.color = "#f7f6f1";
  };
  const onHandleMouseOut = (e) => {
    e.target.style.backgroundColor = "#f7f6f1";
    e.target.style.color = "#191919";
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100%"}
      padding={"40px 40px 40px 0"}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <Box fontSize={"0.9rem"} color={"#969696"}>
          <Text>조사방법</Text>
        </Box>
        <Box
          fontSize={"2rem"}
          fontFamily={"dodum"}
          lineHeight={"1"}
          marginTop={"0.2em"}
          letterSpacing={"0.15em"}
        >
          {selectedTest ? <Text>키워드</Text> : <Text>설문조사</Text>}
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
            <Box fontSize={"1rem"}>
              {selectedTest ? <Text>1분</Text> : <Text>5분</Text>}
            </Box>
          </Box>
          <Box display={"flex"} flexDirection={"column"} marginTop={"0.75em"}>
            <Box fontSize={"0.9rem"} color={"#969696"}>
              설명
            </Box>
            <Box fontSize={"1rem"}>
              {selectedTest ? (
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
        <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
          <Box
            width={"50%"}
            // display={"flex"}
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
              setSelectedTest(!selectedTest);
            }}
          >
            다음
          </Box>
          <Box>01/02</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TextContainer;
