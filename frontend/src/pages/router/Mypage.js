import { 
  Box, Text, Divider, Stack, RadioGroup, Radio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, 
} from "@chakra-ui/react";
import MyHistory from "../../components/mypage/History";

const Mypage = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      height={"100vh"}
      backgroundColor={"#f1efe9"}
      userSelect={"none"}
    >
      {/* 마이페이지 */}
      <Box
        paddingLeft={"20%"}
        display={"flex"}
        alignItems={"center"}
        height={"60%"}
        // border={"solid 1px black"}
      >
        {/* 회원정보 */}
        <Stack spacing={5}>
          <Stack spacing={0.1}>
            <Text fontSize={"4xl"}>회원정보</Text>
            <Divider width={"15vh"} borderColor={"black"} />
          </Stack>
          <Stack spacing={0.5}>
            <Text>이름</Text>
            {/* 데이터 통신 */}
            <Text paddingLeft={"2vh"}>김싸피</Text>
          </Stack>
          <Stack spacing={0.5}>
            <Text>이메일</Text>
            {/* 데이터 통신 */}
            <Text paddingLeft={"2vh"}>test@test.com</Text>
          </Stack>
          <Stack spacing={0.5}>
            <Stack direction={"row"}>
              <Text>성별</Text>
              <Text paddingLeft={"140px"}>나이</Text>
            </Stack>
            <RadioGroup value={"1"} paddingLeft={"15px"} >
              <Stack direction={"row"}>
                <Radio size={"sm"} value="1" colorScheme={"green"}>남성</Radio>
                <Radio size={"sm"} value="2" paddingLeft={"10px"} paddingRight={"50px"} isDisabled>여성</Radio>
                <NumberInput width={"70px"} defaultValue={28} size={"xs"} isDisabled>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Stack>
            </RadioGroup>
          </Stack>
        </Stack>
      </Box>
      <Box 
        paddingLeft={"20%"}
        display={"flex"}
        // alignItems={"center"}
        height={"40%"}
      >
        {/* 히스토리 */}
        <Stack spacing={5}>
          <Stack spacing={0.1}>
            <Text fontSize={"4xl"}>일지</Text>
            <Divider width={"7.5vh"} borderColor={"black"} />
          </Stack>
          <Stack spacing={20} direction={"row"}>
            <MyHistory></MyHistory>
            <MyHistory></MyHistory>
            <MyHistory></MyHistory>
            <MyHistory></MyHistory>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Mypage;
